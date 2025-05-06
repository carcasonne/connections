from bs4 import BeautifulSoup
import os
import re
import requests

# Paths
html_path = "data/list.html"
output_folder = "./output"
poster_folder = "./posters"

os.makedirs(output_folder, exist_ok=True)
os.makedirs(poster_folder, exist_ok=True)

# Open and parse the HTML file
with open(html_path, "r", encoding="utf-8") as file:
    soup = BeautifulSoup(file, "html.parser")

# Iterate over each <li> with class "poster-container"
for li in soup.select("li.poster-container"):
    div = li.find("div", class_="film-poster")

    # Extract data
    film_name = div.get("data-film-name")
    film_slug = div.get("data-film-slug")
    film_year_match = re.search(r"\((\d{4})\)", li.text)
    film_year = int(film_year_match.group(1)) if film_year_match else None
    rating_tag = li.select_one("span.rating")
    rating = rating_tag.text.count("★")

    # Get the inner <img> element's 'src' (the actual poster image)
    inner_div = div.find("div")
    img_tag = inner_div.find("img") if inner_div else None
    poster_url = img_tag.get("src") if img_tag else None

    if poster_url:
        poster_url = re.sub(r"-0-\d+-0-\d+-crop\.jpg", "-0-1000-0-1500-crop.jpg", poster_url)

    # https://a.ltrbxd.com/resized/film-poster/7/7/1/9/4/9/771949-becoming-led-zeppelin-0-1000-0-1500-crop.jpg?v=f699236a79

    # Safe filenames
    safe_slug = film_slug.replace("/", "-")
    md_filename = f"{safe_slug}-{film_year}.md"
    md_path = os.path.join(output_folder, md_filename)
    poster_filename = f"{safe_slug}.png"
    poster_path = os.path.join(poster_folder, poster_filename)

    # Download poster image
    if poster_url:
        try:
            response = requests.get(poster_url)
            response.raise_for_status()
            with open(poster_path, "wb") as img_file:
                img_file.write(response.content)
            print(f"Downloaded poster for {film_name}")
        except Exception as e:
            print(f"Failed to download poster for {film_name}: {e}")

    # Markdown frontmatter
    frontmatter = f"""+++
title = "{film_name}"
date = 2023-01-01
[extra]
poster = "/images/movies/{poster_filename}"
director = ""
rating = {rating}
year = {film_year if film_year else ""}
genre = []
+++

(No review available.)
"""

    # Write Markdown file
    with open(md_path, "w", encoding="utf-8") as out_file:
        out_file.write(frontmatter)

print(f"Markdown files written to: {output_folder}")
print(f"Posters saved to: {poster_folder}")
