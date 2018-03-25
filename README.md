# CashPositive-Assignment
# Introduction
This API allows user to get register themselves and send messages to each other 

# Overview
1. Default running port is set to 3000. 
2. All the logical part is written in controller files and validation part is in models.
3. Database used is mysql.


# Database Schema

	# Tables
	1. Users
		->id
		->username
		->first_name
		->last_name
		->hashed_password
	2. Messages
		->id
		->sender_id (foregin key to User id)
		->reciver_id (foreign key to User id)
		->subject 
		->content
	3. Blocked_list
		->id
		->user_id (signed_in user who will block) (foregin key to users->id)
		->blocked_user_id (the user which will get blocked.)(foreign key to users->id)

# Flow
1.  registration
2. login
3. sendmessage
4. check inbox
5. block any user

# Packeages Used
1. npm i cookie-parser
2. npm i session-file-store
3. npm i node-mysql
4. npm i bcrypt
5. npm i node-session
6. npm i express-session
7. npm i session-file-store
