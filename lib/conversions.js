var Conversions = {
    "length": {
        "name": "Length",
        "default": ["ft", "m"],
        "units": {
            "ml": {
                "name": "Mile",
                "symbol": "ml",
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

            "yd": {
                "name": "Yard",
                "symbol": "yd",
                "conv": {
                    "m": 0.9144,
                    "ft": 3
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
                    "ft": 0.08333333333
                }
            },

            "m": {
                "name": "Meter",
                "symbol": "m",
                "conv": {
                    "ml": 0.000621371,
                    "in": 0.0254,
                    "ft": 3.28084,
                    "km": 0.001,
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
        "name": "Mass"
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
