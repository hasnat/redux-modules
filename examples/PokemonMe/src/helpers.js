export const randomInteger = n => Math.floor((Math.random() * n) + 1);

export const checkOrAssignNumber = (number) => {
  let pokemonNumber = number;

  if (!number) {
    pokemonNumber = randomInteger(150);
  } else if (number > 0 && number < 150) {
    pokemonNumber = number;
  } else {
    pokemonNumber = randomInteger(150);
  }

  return pokemonNumber;
};

export const sanitizeResponse = pokemon => ({
  name: pokemon.name,
  number: pokemon.id,
  picture: pokemon.sprites.front_default,
});
