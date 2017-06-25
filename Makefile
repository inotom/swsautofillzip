# メタ情報
NAME      := $(shell node -pe "require('./package.json').name")
VERSION   := $(shell node -pe "require('./package.json').version")
LICENSE   := $(shell node -pe "require('./package.json').license")
COPYRIGHT := \/*! @license $(NAME).js v$(VERSION) | (c) 2017 http:\/\/www.serendip.ws\/ | $(LICENSE) License *\/
DIST_DIR  := dist
SRC_DIR   := src
BIN_DIR   := ./node_modules/.bin
JS_SRC    := $(SRC_DIR)/$(NAME).js
JS_OUT    := $(DIST_DIR)/$(NAME).min.js

# return binary path
# BIN_DIR に ./node_modules/.bin が設定されている場合に
# $(call bin_path, uglifyjs) は ./node_modules/.bin/uglifyjs を返す
define bin_path
	$(if $(BIN_DIR), $(BIN_DIR)/$(strip $1), $(strip $1))
endef

# 必要なツール類をセットアップする
## Setup
setup:
	go get github.com/Songmu/make2help/cmd/make2help

js_build: eslint
	cat $(JS_SRC) | sed '1s/^/$(COPYRIGHT) /' | $(call bin_path, uglifyjs) -m -c --comments --source-map includeSources,filename=$(NAME).min.js,url=$(NAME).min.js.map -o $(JS_OUT)

## Start server
server:
	$(call bin_path, browser-sync) start --server dist --files 'dist/**/*' --no-open

## Watch task
watch:
	$(call bin_path, nodemon) -w $(SRC_DIR) -e js -x 'make js_build'

## Build script and css
build: clean js_build

## Check with eslint
eslint:
	$(call bin_path, eslint) $(SRC_DIR)

## Clean dist files
clean:
	find $(DIST_DIR) -type f -name ".DS_Store" | xargs rm -f
	rm -f $(JS_OUT)
	rm -f $(JS_OUT).map

## Show help
help:
	@make2help $(MAKEFILE_LIST)

.PHONY: setup js_build server watch build eslint clean help
