export default async function getCategories() {
    const response = await fetch(`https://opentdb.com/api_category.php`)

    if (!response.ok) throw new Error(`Can't fetch categories`)

    return await response.json();
}