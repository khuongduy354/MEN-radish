
Post {
	id integer pk
	title string
	content string
	author int *> User.id
	comment int *> Comment.id
}

Subreddit {
	id integer pk
	name string
	posts integer null *> Post.id
	admin int *> User.id
	subscribers int *>* User.id
}

User {
	id integer pk increments
	name string
	email string
	created_posts int >* Post.id
	subscribed_subreddits int *>* Subreddit.id
}

Comment {
	id integer pk
	content string
	author int *> User.id
	reply integer null > Comment.id
}

