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
                    "m": 0.30480,
                    "in": 12
                }
            },

            "in": {
                "name": "Inch",
                "symbol": "in",
                "conv": {
                    "m": 0.0254,
                    "ft": 1/12.0
                }
            },

            "m": {
                "name": "Meter",
                "symbol": "m",
                "conv": {
                    "mi": 0.000621371,
                    "NM": 0.000539957,
                    "km": 0.001,
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
                    "oz": 0.0283495,
                    "st": 0.157473
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
                "symbol": "st",
                "conv": {
                    "kg": 0.45359237
                }
            },
            "oz": {
                "name": "Ounce",
                "symbol": "oz",
                "conv": {
                    "g": 28.349523125,
                    "lbs": 1/16.0
                }
            }
        }
    },

    "volume": {
        "name": "Volume"
    },

    "time": {
        "name": "Time"
    },

    "temperature": {
        "name": "Temperature"
    },

    "speed": {
        "name": "Speed"
    }
};
