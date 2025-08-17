# Meeting Room Booking System - Makefile
# Provides convenient commands for Docker development workflow

.PHONY: help up up-detached down restart logs logs-frontend logs-backend build build-frontend build-backend reset-db clean kill-ports shell-frontend shell-backend health status

# Default target
.DEFAULT_GOAL := help

# Colors for output
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
BLUE := \033[34m
NC := \033[0m # No Color

##@ Docker Services

up: ## Start all services with build
	@echo "$(GREEN)🚀 Starting all services...$(NC)"
	docker-compose up --build

up-detached: ## Start all services in background with build
	@echo "$(GREEN)🚀 Starting all services in background...$(NC)"
	docker-compose up -d --build
	@echo "$(BLUE)✅ Services started!$(NC)"
	@echo "Frontend: $(YELLOW)http://localhost:5173$(NC)"
	@echo "Backend:  $(YELLOW)http://localhost:3001/api$(NC)"
	@echo "Health:   $(YELLOW)http://localhost:3001/api/health$(NC)"

down: ## Stop all services
	@echo "$(YELLOW)🛑 Stopping all services...$(NC)"
	docker-compose down

restart: ## Rebuild and restart all services
	@echo "$(BLUE)🔄 Rebuilding and restarting services...$(NC)"
	docker-compose down
	docker-compose up --build -d
	@$(MAKE) status

##@ Logs and Monitoring

logs: ## Show logs for all services (follow)
	docker-compose logs -f

logs-frontend: ## Show frontend logs only (follow)
	docker-compose logs -f frontend

logs-backend: ## Show backend logs only (follow)
	docker-compose logs -f backend

health: ## Check backend health endpoint
	@echo "$(BLUE)🏥 Checking backend health...$(NC)"
	@curl -s http://localhost:3001/api/health | jq . || echo "$(RED)❌ Health check failed$(NC)"

status: ## Show status of all containers
	@echo "$(BLUE)📊 Container Status:$(NC)"
	@docker-compose ps

##@ Building

build: ## Rebuild all services
	@echo "$(BLUE)🔨 Building all services...$(NC)"
	docker-compose build

build-frontend: ## Rebuild frontend only
	@echo "$(BLUE)🔨 Building frontend...$(NC)"
	docker-compose build frontend

build-backend: ## Rebuild backend only
	@echo "$(BLUE)🔨 Building backend...$(NC)"
	docker-compose build backend

##@ Database Management

reset-db: ## Remove database and restart services (⚠️  DESTRUCTIVE)
	@echo "$(RED)⚠️  WARNING: This will delete all bookings data!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)🗄️  Removing database...$(NC)"; \
		docker-compose down -v; \
		docker volume rm booking-dev-db 2>/dev/null || true; \
		echo "$(GREEN)✅ Database removed. Starting fresh...$(NC)"; \
		docker-compose up -d --build; \
		echo "$(GREEN)✅ Services restarted with fresh database$(NC)"; \
	else \
		echo "$(BLUE)Operation cancelled$(NC)"; \
	fi

##@ Debugging

shell-frontend: ## Access frontend container shell
	docker-compose exec frontend sh

shell-backend: ## Access backend container shell
	docker-compose exec backend sh

kill-ports: ## Kill processes using ports 5173 and 3001
	@echo "$(YELLOW)🔫 Killing processes on ports 5173 and 3001...$(NC)"
	@lsof -ti:5173 | xargs -r kill -9 2>/dev/null || echo "No process on port 5173"
	@lsof -ti:3001 | xargs -r kill -9 2>/dev/null || echo "No process on port 3001"
	@echo "$(GREEN)✅ Ports cleared$(NC)"

##@ Cleanup

clean: ## Remove all containers, volumes, and images (⚠️  DESTRUCTIVE)
	@echo "$(RED)⚠️  WARNING: This will remove all containers, volumes, and images!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)🧹 Cleaning up...$(NC)"; \
		docker-compose down -v --rmi all --remove-orphans; \
		docker system prune -f; \
		echo "$(GREEN)✅ Cleanup complete$(NC)"; \
	else \
		echo "$(BLUE)Operation cancelled$(NC)"; \
	fi

##@ Development Workflow

dev: up-detached ## Start development environment (alias for up-detached)

stop: down ## Stop all services (alias for down)

fresh: reset-db ## Fresh start with clean database (alias for reset-db)

##@ Help

help: ## Display this help
	@echo "$(GREEN)Meeting Room Booking System - Development Commands$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make $(YELLOW)<target>$(NC)\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  $(BLUE)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(GREEN)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(BLUE)Quick Start:$(NC)"
	@echo "  make dev         # Start everything in background"
	@echo "  make logs        # Watch logs"
	@echo "  make health      # Check if backend is healthy"
	@echo "  make stop        # Stop when done"
	@echo ""
	@echo "$(YELLOW)URLs:$(NC)"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Backend:  http://localhost:3001/api"
	@echo "  Health:   http://localhost:3001/api/health"

##@ Testing

test-api: ## Test API endpoints
	@echo "$(BLUE)🧪 Testing API endpoints...$(NC)"
	@echo "Health check:"
	@curl -s http://localhost:3001/api/health || echo "$(RED)❌ Failed$(NC)"
	@echo "\nRooms endpoint:"
	@curl -s http://localhost:3001/api/rooms | jq '.[0] | {id, name, capacity}' || echo "$(RED)❌ Failed$(NC)"
	@echo "\nBookings endpoint:"
	@curl -s -H "x-user-id: user123" http://localhost:3001/api/bookings | jq '. | length' || echo "$(RED)❌ Failed$(NC)"

##@ Maintenance

update: ## Pull latest images and rebuild
	@echo "$(BLUE)⬇️  Pulling latest base images...$(NC)"
	docker-compose pull
	@echo "$(BLUE)🔨 Rebuilding with latest images...$(NC)"
	docker-compose build --no-cache
	@echo "$(GREEN)✅ Update complete$(NC)"

backup-db: ## Backup database (copy SQLite file)
	@echo "$(BLUE)💾 Backing up database...$(NC)"
	@mkdir -p ./backups
	@docker-compose exec -T backend cat /app/data/bookings.db > ./backups/bookings-backup-$(shell date +%Y%m%d-%H%M%S).db
	@echo "$(GREEN)✅ Database backed up to ./backups/$(NC)"

restore-db: ## Restore database from backup (requires BACKUP_FILE=path)
	@if [ -z "$(BACKUP_FILE)" ]; then \
		echo "$(RED)❌ Please specify BACKUP_FILE=path/to/backup.db$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)📁 Restoring database from $(BACKUP_FILE)...$(NC)"
	@docker-compose down
	@cat $(BACKUP_FILE) | docker-compose exec -T backend tee /app/data/bookings.db > /dev/null
	@docker-compose up -d
	@echo "$(GREEN)✅ Database restored$(NC)"

##@ Local / Non-Docker Development

local-backend: ## Run backend locally without Docker
	@echo "$(GREEN)🚀 Starting backend locally...$(NC)"
	@npm --prefix ./backend run dev

local-frontend: ## Run frontend locally without Docker
	@echo "$(GREEN)🚀 Starting frontend locally...$(NC)"
	@npm --prefix ./frontend run dev

local-reset-db: ## Reset local SQLite DB (delete bookings.db in backend/data)
	@echo "$(RED)⚠️  WARNING: This will delete your local SQLite database!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		rm -f ./backend/bookings.db; \
		echo "$(GREEN)✅ Local SQLite database reset$(NC)"; \
	else \
		echo "$(BLUE)Operation cancelled$(NC)"; \
	fi

local-health: ## Check local backend health endpoint
	@echo "$(BLUE)🏥 Checking local backend health...$(NC)"
	@curl -s http://localhost:3001/api/health | jq . || echo "$(RED)❌ Health check failed$(NC)"
