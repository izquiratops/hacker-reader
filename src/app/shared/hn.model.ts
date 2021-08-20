export enum ItemType {
  job = 'job',
  story = 'story',
  comment = 'comment',
  poll = 'poll',
  pollopt = 'pollopt',
}

export interface Item {
  id: number; // The item's unique id.
  deleted: boolean; // true if the item is deleted.
  type: ItemType; // The type of item. One of "job", "story", "comment", "poll", or "pollopt".
  by: string; // The username of the item's author.
  time: number; // Creation date of the item, in Unix Time.
  text: string; // The comment, story or poll text. HTML.
  dead: boolean; // true if the item is dead.
  parent: number; // The comment's parent: either another comment or the relevant story.
  poll: number; // The pollopt's associated poll.
  kids: number[]; // The ids of the item's comments, in ranked display order.
  url: string; // The URL of the story.
  score: number; // The story's score, or the votes for a pollopt.
  title: string; // The title of the story, poll or job. HTML.
  parts: number[]; // A list of related pollopts, in display order.
  descendants: number; // In the case of stories or polls, the total comment count.
  replies: Item[]; // The objects of the item's comments, this contains all the data to bind into the tree.
}

export interface ItemFlatNode extends Item {
  level: number;
  color: string;
  expandable: boolean;
}

export const TYPES = [
  'topstories',
  'beststories',
  'newstories',
  'askstories',
  'showstories',
  'jobstories',
];

export const TYPE_LABELS = ['Top', 'Best', 'New', 'Ask', 'Show', 'Job'];

export const TYPE_ICONS = [
  'whatshot',
  'favorite',
  'new_releases',
  'help',
  'preview',
  'work',
];

export enum Theme {
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
}

export enum ThemeIcon {
  LIGHT = 'light_mode',
  DARK = 'nights_stay',
}

export enum Palette {
  '#577590' = 0,
  '#43AA8B' = 1,
  '#90BE6D' = 2,
  '#F9C74F' = 3,
  '#F8961E' = 4,
  '#F3722C' = 5,
  '#F94144' = 6,
}
