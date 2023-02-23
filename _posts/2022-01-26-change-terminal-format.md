---
layout: post
title:  "How to change the terminal user format"
date:   2022-01-26 10:00:40
draft: true
#og_image: /assets/img/content/gastro_internship.jpg
---


<br />


# Table of Contents
1. [Introduction](#Introduction)
2. [](#)
3. [](#)
4. [Conclusion](#Conclusion)


<br />

# Introduction

As a student of biomedical engineering at Instituto Superior Técnico, I have always found that there is far too little time that is spent in a clinical setting. As such, when I got the opportunity to undertake an observational internship at the gastroenterology techniques unit at Hospital de Santa Maria, I was excited to take on this endeavour. This experience turned out to be one of the most formative of my career since it allowed me to experience first hand how engineering could help medical practice.

<br />

# 

To modify the shell prompt we first need to open the following file: 
```bash 
~/.bashrc 
```
In this file, scroll down until you find the line that starts with: 
```
PS1=
```

This line is the one that establishes the format of the shell prompt and the one to change. Thus, if you want, make a copy of it (or of the whole file) for safekeeping.



<br />

# 

```
export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxegedabagaced
PS1="[\[$(tput setaf 10)\]\u\[$(tput setaf 11)\]@\[$(tput setaf 9)\]\h\[$(tput sgr0)\]:\w]\$ "
```

export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxegedabagaced
PS1=[
    \[$(tput setaf 10)\]\u
    \[$(tput setaf 11)\]@
    \[$(tput setaf 9)\]\h
    \[$(tput sgr0)\]:\w
    ]\$


<br />

# Conclusion

Overall, my experience at the gastroenterology techniques unit at Hospital de Santa Maria was an incredibly valuable one. I learned so much about the equipment and techniques used to identify and treat gastrointestinal diseases, as well as the importance of technical skills and interdisciplinary collaboration. I am grateful for the opportunity to have observed such skilled professionals at work and I am sure that this experience will stay with me throughout my career as a biomedical engineer.
