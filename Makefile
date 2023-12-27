commitlint: ## Проверка коммитов с помощью conventional commits
	npm install
	git cherry -v origin/master | grep + | awk '$$0=$$2' | while read -r line; do git show --format='%s%+b' -s $$line|yarn commitlint; done

help:  ## Помощь
	@sed -rn 's/^([a-zA-Z_-]+):.*?## (.*)$$/"\1" "\2"/p' < $(MAKEFILE_LIST) | xargs printf "make %-20s# %s\n"

.PHONY: commitlint help
