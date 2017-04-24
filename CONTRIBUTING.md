To contribute to this project, do the following:
- On github, fork the repository
- Then clone the **forked** repository via `git clone YOUR_FORKED_REPO.git`
- `cd` into the cloned repository
- To keep your forked repo up to date with the original or upstream repo, you
will need to add the original repo as remote. Get the ssh git link of the
**original** repository and the cloned repo directory run:
```
git remote add upstream ORIGINAL_REPO.git
```
- Then fetch upstream:
```
git fetch upstream
```
- To point your local master to the upstream master, so when you pull you
will pull from upstream, run the following:
```
git branch --set-upstream-to=upstream/master master
```
- Now you are ready to start implementing! Please make sure you talk to one of
the project maintainer(s) about your implementation before you begin. Create a
new branch with your change via: `git checkout -b FEATURE-NAME` 
