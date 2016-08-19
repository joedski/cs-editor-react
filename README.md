CS Editor in React
==================

Simple CS editor so people don't have to sully their hands with BBCode.  Maybe some time I'll build some sort of schema support to make it easier to customize.  For now, the interface is ad-hoc.  For now, CSs are saved in local storage, not to a server, so it's recommended users periodically save their CSs to their computer for safe keeping.



Todo
----

- [ ] Fully edit the current CS
	- [x] Delete Entries
	- [ ] Picture-links list in Physical Form
	- [x] Fill out rest of form elements
- [ ] Markdown (Commonmark) formatting
- [ ] Undo previous action
	- Note: Undoing a Field Update Action means actually undoing All the last field actions that applied to the same single field.
- [ ] Ability to choose from existing CSs, create new CSs, delete old CSs
- [ ] Save CSs in a zip, in both json and BBCode form, and maybe markdown too so people can read it
- [ ] Ability to import from JSON
- [ ] Ability to import from MD or BBCode
- [ ] WYSIWYG editors
