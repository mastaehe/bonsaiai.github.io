# How to Contribute

Hello! We are very excited and grateful for your interest in contributing to Bonsai's Slate Documentation!

## If You Want to Contribute
----------------------------
This information is copied over from our README

### Prerequisites

You're going to need:

 - **Linux or OS X** — Windows may work, but is unsupported.
 - **Ruby, version 2.2.5 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Getting Set Up

1. Fork this repository on Github.
2. Clone *your forked repository* (not our original one) to your hard drive with `git clone https://github.com/YOURUSERNAME/bonsaiai.github.io.git`
3. `cd bonsaiai.github.io`
4. Initialize and start Slate. You can either do this locally, or with Vagrant:

```shell
# either run this to run locally
bundle install
bundle exec middleman server

# OR run this to run with vagrant
vagrant up

# OR run this to run with Docker
docker-compose up
```

You can now see the docs at http://localhost:4567. Whoa! That was fast!

Now that Slate is all set up on your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/lord/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/lord/slate/wiki/Deploying-Slate).

For more information on using Docker, instructions are available [in the Slate wiki](https://github.com/lord/slate/wiki/Docker).


## Pull Request / Review Process
--------------------------------

**WARNING**: Never touch the `master` branch, this for the deploy script only. Treat the `dev` branch as a psuedo-master branch.

Before you get started: install broken-link-checker via npm with: `npm install broken-link-checker -g`

Follow the test requirements in the PR template before you merge in a PR.


## Deploy Process (INTERNAL EMPLOYEES ONLY)
-------------------------------------------

Follow this process to deploy the dev branch changes to the master branch (and therefore the public website).
1. Change to dev branch (git checkout dev)
2. Pull latest changes from remote dev branch into your local dev branch (git pull)
3. cd to the base folder of slate
4. ./deploy.sh
5. Make sure there were no errors during the deploy and only files you were expecting to change got changed
6. Verify changes were made at docs.bons.ai