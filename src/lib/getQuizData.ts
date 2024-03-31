export default async function getQuizData(categoryId: string, level: string) {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${level}&type=multiple`);

    if (!response.ok) throw new Error(`Can't fetch quiz data`)

    return await response.json()
}