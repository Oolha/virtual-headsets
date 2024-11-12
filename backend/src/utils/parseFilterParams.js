// Parsing function for name (string validation)
const parseName = (name) => {
  const isString = typeof name === 'string';
  if (!isString) return;
  return name.trim() || undefined;
};

// Parsing function for price (number or string validation)
const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price >= 0 ? price : undefined;
  }

  // If string, parse it to number
  if (typeof price === 'string') {
    const parsedPrice = parseInt(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return;
    }
    return parsedPrice;
  }

  return undefined;
};

// Parsing function for compatibility
const parseCompatibility = (compatibility) => {
  const isString = typeof compatibility === 'string';
  if (!isString) return;

  const validCompatibilities = ['Standalone', 'PC', 'PlayStation 5'];
  const normalizedCompatibility = compatibility.trim();

  return validCompatibilities.includes(normalizedCompatibility)
    ? normalizedCompatibility
    : undefined;
};

// Parsing function for color (only Black or White)
const parseColor = (color) => {
  const isString = typeof color === 'string';
  if (!isString) return;

  const validColors = ['White', 'Black'];
  const normalizedColor = color.trim();

  return validColors.includes(normalizedColor) ? normalizedColor : undefined;
};

// Parsing function for manufacturer
const parseManufacturer = (manufacturer) => {
  const isString = typeof manufacturer === 'string';
  if (!isString) return;

  const validManufacturers = [
    'META',
    'VALVE',
    'SONY',
    'HTC',
    'PIMAX',
    'OCULUS',
    'SAMSUNG',
    'HP',
  ];
  const normalizedManufacturer = manufacturer.trim().toUpperCase();

  return validManufacturers.includes(normalizedManufacturer)
    ? normalizedManufacturer
    : undefined;
};

// Main filter params parsing function
export const parseFilterParams = (query) => {
  const { name, minPrice, maxPrice, compatibility, color, manufacturer } =
    query;

  const parsedName = parseName(name);
  const parsedMinPrice = parsePrice(minPrice);
  const parsedMaxPrice = parsePrice(maxPrice);
  const parsedCompatibility = parseCompatibility(compatibility);
  const parsedColor = parseColor(color);
  const parsedManufacturer = parseManufacturer(manufacturer);

  return {
    name: parsedName,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
    compatibility: parsedCompatibility,
    color: parsedColor,
    manufacturer: parsedManufacturer,
  };
};
