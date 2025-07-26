import reflex as rx

config = rx.Config(
    app_name="finansijska_platforma",
    api_url="/api",
    db_url="sqlite:///reflex.db",
    env=rx.Env.DEV,
    telemetry_enabled=False,
)

# Konfiguracija statičkih fajlova
config.frontend_packages = ["chart.js"]
config.tailwind = {
    "theme": {
        "extend": {},
    },
    "plugins": []
}
