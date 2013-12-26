var Conversions = {
    "length": {
        "name": "Length",
        "default": ["ft", "m"],
        "units": {
            "mi": {
                "name": "Mile",
                "symbol": "mi",
                "conv": {
                    "m": 1609.344,
                    "ft": 5280
                }
            },

            "NM": {
                "name": "Nautical Mile",
                "symbol": "NM",
                "conv": {
                    "m": 1852
                }
            },

            "rd": {
                "name": "Rod",
                "symbol": "rd",
                "conv": {
                    "ft": 16.5,
                    "m": 5.0292
                }
            },

            "yd": {
                "name": "Yard",
                "symbol": "yd",
                "conv": {
                    "ft": 3,
                    "m": 0.9144
                }
            },

            "ft": {
                "name": "Foot",
                "symbol": "ft",
                "conv": {
                    "in": 12,
                    "yd": 1/3,
                    "m": 0.30480
                }
            },

            "in": {
                "name": "Inch",
                "symbol": "in",
                "conv": {
                    "yd": 1/36,
                    "ft": 1/12,
                    "m": 0.0254
                }
            },

            "m": {
                "name": "Meter",
                "symbol": "m",
                "conv": {
                    "mi": 0.000621371,
                    "NM": 0.000539957,
                    "km": 0.001,
                    "yd": 1/0.9144,
                    "rd": 3.28084/16.5,
                    "ft": 3.28084,
                    "in": 39.3701,
                    "cm": 100,
                    "mm": 1000
                }
            },

            "cm": {
                "name": "Centimeter",
                "symbol": "cm",
                "conv": {
                    "m": 0.01
                }
            },

            "mm": {
                "name": "Millimeter",
                "symbol": "mm",
                "conv": {
                    "m": 0.001
                }
            },

            "km": {
                "name": "Kilometer",
                "symbol": "km",
                "conv": {
                    "m": 1000
                }
            }
        }
    },

    "mass": {
        "name": "Mass",
        "default": ["kg", "lbs"],
        "units": {
            "kg": {
                "name": "Kilogram",
                "symbol": "kg",
                "conv": {
                    "g": 1000,
                    "mg": 1000000,
                    "lbs": 2.20462,
                    "t": 0.001,
                    "ton": 0.00098420652,
                    "shtn": 0.00110231131,
                    "oz": 35.274,
                    "st": 0.157473
                }
            },
            "g": {
                "name": "Gram",
                "symbol": "g",
                "conv": {
                    "kg": 0.001
                }
            },
            "mg": {
                "name": "Milligram",
                "symbol": "mg",
                "conv": {
                    "kg": 0.000001
                }
            },
            "ton": {
                "name": "Long Ton",
                "symbol": "ton",
                "conv": {
                    "kg": 1016.0469088,
                    "lbs": 2240
                }
            },
            "t": {
                "name": "Metric Ton",
                "symbol": "t",
                "conv": {
                    "kg": 1000
                }
            },
            "shtn": {
                "name": "Short Ton",
                "symbol": "shtn",
                "conv": {
                    "kg": 907.18474,
                    "lbs": 2000
                }
            },
            "st": {
                "name": "Stone",
                "symbol": "st",
                "conv": {
                    "kg": 6.35029318,
                    "lbs": 14
                }
            },
            "lbs": {
                "name": "Pound",
                "symbol": "lbs",
                "conv": {
                    "kg": 0.45359237
                }
            },
            "oz": {
                "name": "Ounce",
                "symbol": "oz",
                "conv": {
                    "g": 28.349523125,
                    "lbs": 1/16
                }
            }
        }
    },

    "volume": {
        "name": "Volume",
        "default": ["us_gal", "l"],
        "units": {
            "us_gal": {
                "name": "US Gallon",
                "symbol": "gal",
                "conv": {
                    "us_qt": 4,
                    "l": 3.78541
                }
            },
            "us_qt": {
                "name": "US Quart",
                "symbol": "qt",
                "conv": {
                    "us_gal": 0.25,
                    "l": 0.946353
                }
            },
            "us_pt": {
                "name": "US Pint",
                "symbol": "pt",
                "conv": {
                    "us_gal": 0.125,
                    "us_c": 2,
                    "l": 0.473176
                }
            },
            "us_c": {
                "name": "US Cup",
                "symbol": "c",
                "conv": {
                    "us_gal": 0.0625,
                    "us_pt": 0.5,
                    "l": 0.236588
                }
            },
            "us_oz": {
                "name": "US Ounce",
                "symbol": "oz",
                "conv": {
                    "us_gal": 0.0078125,
                    "l": 0.0295735
                }
            },
            "us_tbsp": {
                "name": "US Tablespoon",
                "symbol": "tbsp",
                "conv": {
                    "us_gal": 0.00390625,
                    "l": 0.0147868
                }
            },
            "us_tsp": {
                "name": "US Teaspoon",
                "symbol": "tsp",
                "conv": {
                    "us_gal": 0.00130208,
                    "l": 0.00492892
                }
            },
            "im_gal": {
                "name": "Imperial Gallon",
                "symbol": "gal",
                "conv": {
                    "l": 4.54609
                }
            },
            "im_qt": {
                "name": "Imperial Quart",
                "symbol": "qt",
                "conv": {
                    "l": 1.13652
                }
            },
            "im_pt": {
                "name": "Imperial Pint",
                "symbol": "pt",
                "conv": {
                    "l": 0.568261
                }
            },
            "im_oz": {
                "name": "Imperial Ounce",
                "symbol": "oz",
                "conv": {
                    "l": 0.0284131
                }
            },
            "im_tbsp": {
                "name": "Imperial Tablespoon",
                "symbol": "tbsp",
                "conv": {
                    "l": 0.0177582
                }
            },
            "im_tsp": {
                "name": "Imperial Teaspoon",
                "symbol": "tsp",
                "conv": {
                    "l": 0.00591939
                }
            },
            "cu_ft": {
                "name": "Cubic Foot",
                "symbol": "cu-ft",
                "conv": {
                    "l": 28.3168
                }
            },
            "cu_in": {
                "name": "Cubic Inch",
                "symbol": "cu-in",
                "conv": {
                    "l": 1728
                }
            },
            "cu_m": {
                "name": "Cubic Meter",
                "symbol": "cu-m",
                "conv": {
                    "l": 1000
                }
            },
            "l": {
                "name": "Liter",
                "symbol": "l",
                "conv": {
                    "us_gal": 0.264172,
                    "us_qt": 1.05669,
                    "us_pt": 2.11338,
                    "us_c": 4.22675,
                    "us_oz": 33.814,
                    "us_tbsp": 67.628,
                    "us_tsp": 202.884,
                    "im_gal": 0.219969,
                    "im_qt": 0.879877,
                    "im_pt": 1.75975,
                    "im_oz": 35.1951,
                    "im_tbsp": 56.3121,
                    "im_tsp": 168.936,
                    "mm": 1000,
                    "cu_ft": 0.0353147,
                    "cu_in": 61.0237,
                    "cu_m": 0.001
                }
            },
            "ml": {
                "name": "Milliliter",
                "symbol": "ml",
                "conv": {
                    "l": 0.001
                }
            }
        }
    },

    "temperature": {
        "name": "Temperature",
        "default": ["degC", "degF"],
        "units": {
            "degC": {
                "name": "Degree Celsius",
                "symbol": "°C",
                "conv": {
                    "degF": function(x) { return (x * 9/5) + 32 },
                    "K": function(x) { return x + 273.15 }
                }
            },
            "degF": {
                "name": "Degree Fahrenheit",
                "symbol": "°F",
                "conv": {
                    "degC": function(x) { return (x - 32) * 5/9 }
                }
            },
            "K": {
                "name": "Kelvin",
                "symbol": "K",
                "conv": {
                    "degC": function(x) { return x - 273.15 }
                }
            }
        }
    },

    "speed": {
        "name": "Speed"
    },

    "time": {
        "name": "Time"
    }
};
