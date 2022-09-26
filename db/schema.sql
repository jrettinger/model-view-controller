CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
)

INSERT INTO `blogs` (`id`, `title`, `content`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'What is react?', 'React can be used to create mobile applications (React Native). And React is a diehard fan of reusability, meaning extensive code reusability is supported. So at the same time, we can make IOS, Android and Web applications.', 1, '2022-09-26 17:44:03', '2022-09-65 18:47:59'),
(2, 'Cryptocurrency', 'A cryptocurrency is an encrypted data string that denotes a unit of currency. It is monitored and organized by a peer-to-peer network called a blockchain, which also serves as a secure ledger of transactions, e.g., buying, selling, and transferring.', 2, '2022-09-2617:46:02', '2022-09-26 17:46:02');

/* Table structure for table `comments` */


CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `blogId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Dumping data for table `comments`*/

INSERT INTO `comments` (`id`, `comment`, `userId`, `blogId`, `createdAt`, `updatedAt`) VALUES
(1, 'awesome', 1, 1, '2022-09-25 17:44:32', '2022-09-25 17:44:32'),
(2, 'great', 2, 1, '2022-09-25 17:45:21', '2022-09-25 17:45:21'),
(3, 'money', 2, 2, '2022-09-25 17:46:11', '2022-09-25 17:46:11');


/* -- Table structure for table `users` */

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
)

/* -- Dumping data for table `users` */

INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Jason Rettinger', '$2b$10$ZxKqBSwhSQ5C6G/5QLcHEOJzssqV2LgmIJRwjjkumAHoJUHRqcmTi', '2022-09-25 17:42:59', '2022-09-25 17:42:59'),
(2, 'ishtiyak zafar', '$2b$10$Ix.erAqtDnWi5sHadl2Yuu7X6WMo7SzzVitAI.sFKmrORyS2vOzcG', '2022-09-25 17:44:53', '2022-09-25 17:44:53');


/* -- Indexes for dumped tables */

/* -- Indexes for table `blogs` */

ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

/* -- Indexes for table `comments` */

ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `blogId` (`blogId`);


/* -- Indexes for table `users` */

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH;


/* AUTO_INCREMENT for dumped tables */



/* AUTO_INCREMENT for table `blogs` */

ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


/* AUTO_INCREMENT for table `comments` */

ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


/* -- AUTO_INCREMENT for table `users` */

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


/* -- Constraints for dumped tables */


/* -- Constraints for table `blogs` */

ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;


/* -- Constraints for table `comments` */

ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`blogId`) REFERENCES `blogs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;