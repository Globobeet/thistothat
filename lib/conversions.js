var Conversions = {
    "length": {
        "name": "Length",
        "default": ["ft", "m"],
        "units": {
            "ml": {
                "name": "Mile",
                "symbol": "ml",
                "def": {
                    "m": 1609.344,
                    "ft": 5280
                }
            },

            "NM": {
                "name": "Nautical Mile",
                "def": {
                    "m": 1852
                }
            },

            "yd": {
                "name": "Yard",
                "symbol": "yd",
                "def": {
                    "m": 0.9144,
                    "ft": 3
                }
            },

            "ft": {
                "name": "Foot",
                "symbol": "ft",
                "def": {
                    "m": 0.30480,
                    "in": 12
                }
            },

            "in": {
                "name": "Inch",
                "symbol": {
                    "m": 0.0254,
                    "ft": 0.08333333333
                }
            },

            "m": {
                "name": "Meter",
                "symbol": "m",
                "def": {
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
                "def": {
                    "m": 0.01
                }
            },

            "mm": {
                "name": "Millimeter",
                "symbol": "mm",
                "def": {
                    "m": 0.001
                }
            },

            "km": {
                "name": "Kilometer",
                "symbol": "km",
                "def": {
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
