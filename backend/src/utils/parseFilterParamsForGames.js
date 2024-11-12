const parseName = (name) => {
  const isString = typeof name === 'string';
  if (!isString) return;
  return name.trim() || undefined;
};

const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price >= 0 ? price : undefined;
  }

  if (typeof price === 'string') {
    const parsedPrice = parseInt(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return;
    }
    return parsedPrice;
  }

  return undefined;
};

const parseCompatibility = (compatibility) => {
  const isString = typeof compatibility === 'string';
  if (!isString) return;

  const validCompatibilities = ['PlayStation VR2', 'PC VR', 'Standalone'];
  const normalizedCompatibility = compatibility.trim();

  return validCompatibilities.includes(normalizedCompatibility)
    ? normalizedCompatibility
    : undefined;
};

const parseGenre = (genre) => {
  const validGenres = [
    'Action-Adventure',
    'First-Person Shooter',
    'Rhythm',
    'Action-Survival',
    'Adventure',
    'Puzzle-Platformer',
    'Space Combat',
  ];
  if (typeof genre === 'string') {
    const normalizedGenre = genre.trim().toLowerCase();
    return validGenres.map((g) => g.toLowerCase()).includes(normalizedGenre)
      ? validGenres.find((g) => g.toLowerCase() === normalizedGenre)
      : undefined;
  }

  return undefined;
};

const parseRating = (rating) => {
  if (typeof rating === 'number') {
    return rating >= 0 && rating <= 5 ? rating : undefined;
  }

  if (typeof rating === 'string') {
    const parsedRating = parseFloat(rating);
    return !isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 5
      ? parsedRating
      : undefined;
  }

  return undefined;
};

export const parseFilterParams = (query) => {
  const { name, minPrice, maxPrice, compatibility, genre, rating } = query;
  const parsedName = parseName(name);
  const parsedMinPrice = parsePrice(minPrice);
  const parsedMaxPrice = parsePrice(maxPrice);
  const parsedCompatibility = parseCompatibility(compatibility);
  const parsedGenre = parseGenre(genre);
  const parsedRating = parseRating(rating);

  return {
    name: parsedName,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
    compatibility: parsedCompatibility,
    genre: parsedGenre,
    rating: parsedRating,
  };
};
