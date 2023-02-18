CREATE TABLE chat_message (
  id SERIAL PRIMARY KEY,
  room_id VARCHAR(255),
  sender VARCHAR(255),
  message VARCHAR(255),
  chat_room_id INTEGER,
  date DATETIME(6),
  user_count INT
);

CREATE TABLE chat_room (
   id SERIAL PRIMARY KEY,
   room_id VARCHAR(255),
   room_name VARCHAR(255),
   user_id INTEGER,
   user1_id INTEGER,
   receiver_request_status VARCHAR(50),
   user_count INT,
   expire_date DATETIME(6),
   is_sender_blocked BOOLEAN,
   is_receiver_blocked BOOLEAN
);
