# Steps for firing up a full AVA node

[AVA](https://www.avalabs.org) is an open-source platform for launching highly decentralized applications, financial primitives, and interoperable blockchains.

These are steps for firing up an AVA full node on [Digital Ocean](https://www.digitalocean.com).

## Digital Ocean Ubuntu Instance

`ssh` into a Digital Ocean Ubuntu box

## Update and upgrade

```bash
apt-get update -y
apt-get upgrade -y
```

## Install zsh and oh-my-zsh

```bash
apt-get install zsh -y
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install golang

```bash
wget https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.14.2.linux-amd64.tar.gz
```

## Configure `vim`

```bash
 wget https://raw.githubusercontent.com/cgcardona/dotfiles/master/.vimrc
 ```

## Set env vars by adding the following to your `~/.zshrc` file

```text
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
```

## Reload your `.zshrc` file

```bash
source ~/.zshrc
```

## Install AVA deps

```bash
sudo apt-get install git curl build-essential libssl-dev libuv1-dev cmake make g++ -y
```

## Clone the Gecko rep

```bash
go get -v -d github.com/ava-labs/gecko/...
cd $GOPATH/src/github.com/ava-labs/gecko
```

## Build the executable

```bash
./scripts/build.sh
```

## Create new tmux session

```bash
tmux new -s ava-infra
```

## Connect to the Public Testnet

```bash
./build/ava
```

## Confirm the full node has peers

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "admin.peers",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```
