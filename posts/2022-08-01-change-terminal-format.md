---
layout: post
title:  "How to make the terminal colourful"
date:   2022-08-01 10:00:40
draft: false
blurb: "Make the terminal prettier to look at"
og_image: images/banner_terminal.png
---

#### Table of Contents
1. [Introduction](#introduction)
2. [Change the format of the shell prompt](#change-the-format-of-the-shell-prompt)
3. [Change the colour of the shell prompt](#change-the-colour-of-the-shell-prompt)
4. [Change the colour of the folders and files](#change-the-colour-of-the-folders-and-files)
5. [Conclusion](#conclusion)


<br />

#### Introduction

The shell prompt, the epitome of communication with your computer. While often overlooked, it can be a useful tool to perform tasks faster and more systematically that using the GUI of your PC. Although it is very powerful, looking at it can be quite boring, with its plain formatting. A usual shell prompt is usually something like this:
<br />

<img src="./images/macos_terminalOG.png">

But we're going to make it look like this:

<img src="./images/macos_terminalafter.png">
<br />

#### Change the format of the shell prompt

To modify the shell prompt we first need to open the following file: 
```bash 
~/.bash_profile
```
In this file, scroll down until you find the line that starts with: 
```
PS1= ...
```

This line is the one that establishes the format of the shell prompt and the one to change. Thus, if you want, make a copy of it (or of the whole file) for safekeeping. Now, we will change this line.

If you're on a mac, the default for this line should be:

```
PS1='\h:\w \u\$ '
```

Which basically means that it is in the format hostname:current_working_directory username$. So, in my case it is MacBookProAna:~ ana$. 

I didn't like this formatting due to several reasons, for example, the fact that the user comes last and that there is not a more clear separation with the current working directory. Therefore I wanted to change it to [ana@MacBookProAna:~]$. Basically, use the parenthesis to separate the prompt from the rest and the current working directory after the colon. Moreover, it made more sense to me to have the user first and then at (@) the hostname, although this is my personal computer and thus the hostname could even be supressed because it is always the same.

To do this, were are going to just reorder the character from the last line and add the parenthesis, like so:

```
PS1='[\u@\h:\w]$ '
```

Now it is in the format that I wanted.

<br />

#### Change the colour of the shell prompt

However, the shell prompt is still a little sad and so I decided to add some colour to it.
To do so, I used the tput command before each of the characters that I wanted to change like so:

```
PS!="[\[$(tput setaf 10)\]\u\[$(tput setaf 11)\]@\[$(tput setaf 9)\]\h\[$(tput sgr0)\]:\w]\$ "
```

Inserting \[$(tput setaf 10)\] is used to change all characters in front of it to the color 10 and if instead of setaf there is sgr0 it means to reset the color. You can see which numbers correspond to what color in this <a href="https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit:~:text=135-,136,-137">table</a>. If you want to read more about it see this <a href="https://linuxopsys.com/topics/customizing-bash-prompt-in-linux-changing-colors">article</a>. 

Call me patriotic, but I do think it is a great combination of colors.

<br />

#### Change the colour of the folders and files

You thought that was the end of terminal personalization? No, this will be the final step to have a colourful and fun terminal. If you ever worked with linux, then you know the colours I'm refering to.
Instead of having all files as folders white when you list them, we'll make their colours have meaning, such as blue for folders and green for executables. To do so, you only need to add these lines to the .bash_profile file:

```
export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxegedabagaced
```

And Voilà, the terminal is fully personalized to your liking. 

<br />

#### Conclusion

So as you can see, formatting the shell prompt makes a whole difference and you'll even start to look forward to opening the terminal app.
If you want to delve deeper into the formatting, I suggest reading this <a href="https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html">article</a>. 