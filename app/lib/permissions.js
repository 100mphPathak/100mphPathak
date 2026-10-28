// Who may do what. Checked on the server for every admin page and action.
export const ROLES = {
  editor: "Editor",
  content_admin: "Content administrator",
  super_admin: "Super administrator",
};

const RANK = { editor: 1, content_admin: 2, super_admin: 3 };

const NEEDS = {
  "page.view": 1,
  "page.edit": 1, // save drafts
  "page.preview": 1,
  "media.view": 1,
  "media.upload": 1,
  "page.publish": 2,
  "page.unpublish": 2,
  "page.restore": 2,
  "page.seo": 2,
  "media.delete": 2,
  "global.edit": 3,
  "page.robots": 3, // noindex
  "users.manage": 3,
  "audit.view": 3,
};

export function can(role, action) {
  if (!(action in NEEDS)) throw new Error(`Unknown permission "${action}"`);
  return (RANK[role] ?? 0) >= NEEDS[action];
}
