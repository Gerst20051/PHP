CREATE TABLE IF NOT EXISTS `treeview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `open` tinyint(4) NOT NULL,
  `folder` tinyint(4) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
