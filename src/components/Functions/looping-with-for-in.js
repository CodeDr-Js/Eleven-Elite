const openbet = {
  date1: { id: { ticket: { game: "game1" } } },
  date2: { id: { ticket: { game: "game2" } } },
  date3: { id: { ticket: { game: "game3" } } },
};

// Iterate over the keys of the openbet object
for (const dateKey in openbet) {
  if (Object.hasOwnProperty.call(openbet, dateKey)) {
    const dateObject = openbet[dateKey];
    // Iterate over the keys of each date object
    for (const idKey in dateObject) {
      if (Object.hasOwnProperty.call(dateObject, idKey)) {
        const idObject = dateObject[idKey];
        // Access the game property of the ticket object
        const game = idObject.ticket.game;
        console.log(game); // Output: game1, game2, game3
      }
    }
  }
}


Object.keys(openbet).forEach((dateKey) => {
  const dateObject = openbet[dateKey];
  Object.keys(dateObject).forEach((idKey) => {
    const idObject = dateObject[idKey];
    const game = idObject.ticket.game;
    console.log(game); // Output: game1, game2, game3
  });
});
