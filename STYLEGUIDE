STYLE GUIDE FOR BONSAI'S SLATE MARKDOWN DOCUMENTATION
-----------------------------------------------------

General Slate Markdown Syntax can be found here: https://github.com/lord/slate/wiki/Markdown-Syntax

This guide is to describe how Bonsai's usage may be different than what you'll see in the general Slate syntax or to give best practices or guidance on when to use various syntax.

SLATE FOLDER STRUCTURE

Each part of the docs (examples, references, guides) have their own folders within the /source folder to group their parent files. The parent file contains the location of each partial file within the /includes folder, the order to display them in, and which (if any) language tabs to display. 


SLATE MARKDOWN HEADINGS

# This is a first/top level heading

One # is used on the first line of a new partial file. This is a linkable heading (you can use anchor links to point to it elsewhere in the docs) and it shows up on the left-hand contents panel by default. This heading cannot be identical to anything else on this page or it won't have a unique anchor link to it.

## This is a second level heading

Two # are used to break up first level headings into subheadings. These are linkable headings (you can use anchor links to point to it elsewhere in the docs) and it shows up on the left-hand contents panel once you have clicked on its first level heading. This heading cannot be identical to anything else on this page or it won't have a unique anchor link to it.

###### This is a third level heading

Six # are used to break up second level headings into subheadings. This was a hack put in the CSS specifically for Bonsai. These are linkable headings (you can use anchor links to point to it elsewhere in the docs) and it shows up on the left-hand contents panel once you have clicked on its second level heading. These headings are avoided if possible, generally in favor of using major text headings. This heading cannot be identical to anything else on this page or it won't have a unique anchor link to it.

### This is a major text heading

Three # are used to head up a section of text that is nested within either a first, second, or third level heading. They are NOT linkable with anchor links and they do NOT show up in the left-hand contents panel.

#### This is a minor text heading

Four # are used to head up a section of text that is nested within either a first, second, or third level heading. They are NOT linkable with anchor links and they do NOT show up in the left-hand contents panel. They are very very rarely used in the Bonsai documentation, in favor of keeping things just under major text headings and using bold or bulleted lists when desired.


DOCUMENTING CODE IN SLATE

```
This is a code block
```

Three ` are used on either side to show a block of code. This will automatically move the code block to the code panel. The code panel is shown on the right-hand side on desktop view and above the text on mobile view.

Always have the code block above the description of it, as this will align the text and code side-by-side in the desktop view. Otherwise, Slate will leave an odd space and not start to display the code until after the text.

Language tabs in Slate are used when one language (or operating system in some cases of install) may be used instead of another (not when used in tandem). For more information on syntax see: https://github.com/lord/slate/wiki/Customizing-the-Language-Tabs

`This is a code snippet`

A single ` on each side of some text displays the text in code font/style. This code stays in-line with the rest of the text in the text column. Code snippets in-line are typically used when explaining a part of a code block, or in reference to another part of code.

> This is code-panel text

One > is used when a text heading, description, or comment is desired to be displayed above or below a code block. This is often used as text headings only because comments are usually contained inside of the code block itself.


WHEN TO USE TEXT FORMATTING

**This is bold text**

Bold text is used to add emphasis where needed, to introduce a new subject that isn't code, or to refer to a type of subject, without using the actual code for it. For example, **concepts** vs. `concept`. Always use code snippet syntax when talking about actual code instead of bold syntax.

[1]: http://this.is.a.link
[2]: #this-is-an-anchor-link
[3]: ../references/cli-reference.html#anchor-link-on-different-page

When text is referring to another part of the documentation you should use an anchor link to that section's heading. You can use anchor links for first, second, or third level headings, the anchor link format is the same. The [link text][1] is contained in brackets followed by its shorthand. All of the shorthand links should be at the very bottom of the partial file for ease of scanning and updating.

Bulleted listed and numbered lists are standard Markdown and are used when needed.


INTERNAL COMMENTS

[//]: # (This is a comment left for internal use.)

This is a combination of comment hacks in Slate and markdown that does not get displayed or rendered in the HTML source. Used at times for noting where to put something back in later or sometimes at the top of files to leave internal notes. These can still be read in the GitHub source so don't leave anything confidential in these comments.


FURTHER QUESTIONS? Contact support@bons.ai.
