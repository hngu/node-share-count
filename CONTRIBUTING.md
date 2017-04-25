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
Once you have made your change, push your change to your repo via:
```
git push origin FEATURE-NAME
```
If you do not want to specify `origin` every time you push, you can specify
the remove with:
```
git push -u origin FEATURE-NAME  # the -u flag sets your upstream to origin
```
Then you can simply type `git push` without specifying the origin or branch
- Create a pull request on the original repo where the base fork is the
original repo and base is `master` and head fork is your forked repo and head
branch is `FEATURE-NAME`
- If you need to update your PR, just make your changes and push your changes
- If the upstream branch is updated, you will need to update your branch. To
do this you will need to update your upstream:
```
git fetch upstream
```
- Then you do a rebase where you take all the most up to date changes from
master and you apply your changes onto it:
```
git rebase upstream/master # start the rebase
# the following only applies if there were merge conflicts during a rebase:
git add .
git rebase --continue
# if you have trouble rebasing, use the following:
git rebase --abort
# then do a force push since a rebase changes git history
git push -f
```
- When your changes are approved by the project maintainer(s) you can squash
you commits via rebase:
```
git rebase -i <SHA commit before your oldest change>
```
That will open an editor to pick/squash your commits. Squash your bottom commit
and save which will then open another editor to add a commit message for your
squashed commit. Save and then do `git log` to verify your log. Since you are
doing a rebase you will need to do `git push -f` again
- Finally, let the project maintainer(s) know that it is ready to be merged and
they will merge your change.
