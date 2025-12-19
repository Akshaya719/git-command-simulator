
const output = document.getElementById("output");
const input = document.getElementById("command");

let repo = false;
let staged = false;
let branch = "main";
let stash = false;
let commits = 0;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    execute(input.value.trim());
    input.value = "";
  }
});

function runCmd(cmd) {
  execute(cmd);
}

function print(text) {
  output.innerHTML += text + "<br>";
  output.scrollTop = output.scrollHeight;
}

function execute(cmd) {
  print("$ " + cmd);

  if (cmd === "git init") {
    repo = true;
    print("Initialized empty Git repository");
  }

  else if (cmd === "git status") {
    if (!repo) print("Not a git repository");
    else if (staged) print("Changes staged for commit");
    else print(`On branch ${branch}<br>nothing to commit`);
  }

  else if (cmd === "git add .") {
    staged = true;
    print("Files added to the staging area");
  }

  else if (cmd.startsWith("git commit")) {
    if (!staged) print("Nothing to commit");
    else {
      commits++;
      staged = false;
      print(`[${branch} ${commits}] Commit successful`);
    }
  }

  else if (cmd === "git branch") {
    print("* " + branch);
    print("  dev");
  }

  else if (cmd.startsWith("git checkout")) {
    branch = cmd.split(" ")[2] || branch;
    print("Switched to branch " + branch);
  }

  else if (cmd.startsWith("git merge")) {
    print("Merged successfully");
  }

  else if (cmd === "git stash") {
    stash = true;
    print("Saved working directory to stash");
  }

  else if (cmd === "git stash pop") {
    if (stash) {
      stash = false;
      print("Applied stash");
    } else print("No stash entries");
  }

  else if (cmd.startsWith("git tag")) {
    print("Tag created");
  }

  else {
    print("Command not supported");
  }
}
