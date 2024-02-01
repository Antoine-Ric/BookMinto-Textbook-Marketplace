# Textbook Marketplace

Welcome to the Textbook Marketplace - the one-stop shop for all your textbook needs. This platform allows students and educators to buy, sell, and exchange textbooks with ease.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (usually comes with Node.js)

### Installing

A step by step series of examples that tell you how to get a development environment running.

```bash
# Clone the repository
git clone https://yourproject.git

# Remember to git pull before making any changes
git pull

# If there are any branches on github.com that you do not see in your local repository, run:
git branch -a

# Install required packages for the frontend
cd frontend
npm install
npm install react-icons --save


# This is how you cna rebase if there are changes to main

```markdown
```bash
# First, make sure you're on your main branch and it's up to date
git checkout main
git pull origin main

# Then, switch to the branch you want to rebase
git checkout your-branch-name

# Rebase the changes from main onto your branch
git rebase main

# If there are any conflicts, resolve them and then continue the rebase
git rebase --continue

# Once the rebase is complete, force push to the remote repository
# Note: Use force push with caution, as it can overwrite history!
git push origin your-branch-name --force







