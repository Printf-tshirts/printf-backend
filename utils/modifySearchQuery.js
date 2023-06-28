const allColors = [
  "Black",
  "White",
  "Navy Blue",
  "Royal Blue",
  "Mint Blue",
  "Olive Green",
  "Mango Yellow",
  "Red",
  "Maroon",
  "Pink",
  "Grey",
];
const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const extractTagsFromSearchQuery = (searchQuery) => {
  const tags = searchQuery.split(" ");
  return tags;
};
const extractColorsFromSearchQuery = (searchQuery) => {
  const colors = [];
  allColors.forEach((color) => {
    if (searchQuery.includes(color.toLowerCase())) {
      colors.push(color);
    }
  });
  return colors;
};

const extractSizesFromSearchQuery = (searchQuery) => {
  const sizes = [];
  allSizes.forEach((size) => {
    if (searchQuery.includes(size.toLowerCase())) {
      sizes.push(size);
    }
  });
  return sizes;
};

const extractCategoryFromSearchQuery = (searchQuery) => {
  return "";
};

module.exports = {
  extractTagsFromSearchQuery,
  extractColorsFromSearchQuery,
  extractSizesFromSearchQuery,
  extractCategoryFromSearchQuery,
};
