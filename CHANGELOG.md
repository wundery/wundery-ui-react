# 5.0.14

* Forms: add hasKey validation.

# 5.0.13

* Hint: enable custom icon or no icon at all.
* Forms: Add regex and posInteger validation.

# 5.0.12

* Tree: require data prop.
* Bugfix: Respect expand flag in sub tree items.

# 5.0.11

* Bugfix: use ES6 spread operators for merging instead of Object.assign (not supported in IE).

# 5.0.10

* New (temporary) tree implementation.

# 5.0.9

This release contains minor improvements and fixes:

* Gallery: Introduce highlighted prop for items.
* Forms: Don't override compact prop if form items.
* Button: Introduce highlight prop.
* Box: Introduce embedded prop.

# 5.0.8

This release contains minor improvements and fixes:

* Thumbnail: introduce inline prop.
* Sidebar: make expandedLabel prop optional.
* Add correct tooltips to flags.
* Bugfix: Stop event propagation on app footer click.

# 5.0.7

This release contains minor improvements and fixes:

* Use random string for button ids.
* Utils: Add random string generator.
* Table: Add responsive helper markup.
* Sidebar: add responsive helper markup.
* Modal: Add body class when open.
* Inline list: Introduce block prop.
* App modal: Introduce closeLabel prop.

# 5.0.6

This release contains minor improvements and fixes:

* Support tooltips in badges.
* Add react tooltip dependency.
* Refactor button component and support tooltips.
* Enhance nav component and introduce prefix prop.

# 5.0.5

This release contains minor improvements and fixes:

* Introduce noShrink prop for flex item component.
* Introduce compact and image props for list item component.
* Introduce compact prop for media component.
* Add a borderLeft prop to flex items.

# 5.0.4

* Forms: Fixes a bug that resulted in a native form submit (page redirect).

# 5.0.3

This release contains minor improvements and fixes:

* Table: Allow any renderable column title content.
* Cleanup table row component.
* New tree component.
* Introduce closable prop for modals to prevent closing.
* Add modal size small.
* Introduce an active prop for filters.

# 5.0.2

This release contains minor improvements and fixes:

* Introduce a disabled prop for button groups.
* Add light badge theme and small prop.
* Add a css class to error fields to visually highlight the fields.

# 5.0.1

This release contains minor improvements and fixes:

* Use 0 as tab index to allow tabbing through form fields.
* Support rendering forms using native form tag.
* Bugfix: Prevent selection of undefined items in lookup component.
* Allow tab content to be specified as tab children.
* Add a width prop to thumbnails.
* Allow omitting of onClick behavior for form list items.

# 5.0.0

We had to start at v5.0.0 because we messed it up with npmjs.org and published some tags earlier. npmjs.org does not allow to remove or alter previously published versions after the [leftpad desaster](http://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/).
