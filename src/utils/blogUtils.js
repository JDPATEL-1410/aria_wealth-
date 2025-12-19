// Utility functions for blog articles

// Get a deterministic "random" selection based on the current date
// This ensures the same 3 articles are shown throughout the day
export const getDailyArticles = (articles, count = 3) => {
    if (!articles || articles.length === 0) return [];

    // Get today's date as a seed (YYYY-MM-DD format)
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Simple hash function to convert date string to a number
    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    const seed = hashCode(dateString);

    // Seeded random number generator
    const seededRandom = (max, offset = 0) => {
        const x = Math.sin(seed + offset) * 10000;
        return Math.floor((x - Math.floor(x)) * max);
    };

    // Get unique random indices
    const selectedIndices = new Set();
    const maxAttempts = articles.length * 2;
    let attempts = 0;

    while (selectedIndices.size < Math.min(count, articles.length) && attempts < maxAttempts) {
        const randomIndex = seededRandom(articles.length, selectedIndices.size);
        selectedIndices.add(randomIndex);
        attempts++;
    }

    // Return the selected articles
    return Array.from(selectedIndices).map(index => articles[index]);
};

// Strip HTML tags from content
export const stripHtml = (html = "") => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
};

// Extract first image from HTML content
export const extractFirstImageFromHtml = (html = "") => {
    try {
        const match = html.match(/<img[^>]+src="([^">]+)"/i);
        return match && match[1] ? match[1] : null;
    } catch {
        return null;
    }
};

// Calculate read time based on word count
export const getReadTime = (text) => {
    const words = stripHtml(text).split(' ').length;
    return `${Math.max(3, Math.ceil(words / 200))} min read`;
};

// Categorize article based on content
export const categorizeArticle = (title, description) => {
    const content = `${title} ${description}`.toLowerCase();

    if (content.match(/beginner|start|basic|guide|intro|student|simple/)) return 'Beginner';
    if (content.match(/retire|freedom|passive|pension|fire|estate/)) return 'Freedom Seeker';
    if (content.match(/invest|stock|mutual|fund|market|portfolio|wealth|tax|gold|equity/)) return 'Wealth Builder';

    return 'Live Articles';
};

// Fetch articles from Economic Times RSS feeds
export const fetchEconomicTimesArticles = async () => {
    const etSources = [
        { url: 'https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms', name: 'ET Wealth' },
        { url: 'https://economictimes.indiatimes.com/mutual-funds/rssfeeds/19418729.cms', name: 'ET Mutual Funds' },
        { url: 'https://economictimes.indiatimes.com/wealth/personal-finance-news/rssfeeds/42861216.cms', name: 'ET Personal Finance' }
    ];

    try {
        const promises = etSources.map(async (source) => {
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status !== 'ok') {
                console.warn(`Failed to fetch ${source.name}:`, data.message);
                return [];
            }

            return data.items.map(item => {
                const cleanDesc = stripHtml(item.description);
                const category = categorizeArticle(item.title, cleanDesc);

                return {
                    id: `et-${item.guid || Math.random()}`,
                    title: item.title,
                    excerpt: cleanDesc.substring(0, 150) + "...",
                    image: item.thumbnail || item.enclosure?.link || extractFirstImageFromHtml(item.description) || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
                    category: category === 'Live Articles' ? 'Live Articles' : category,
                    readTime: getReadTime(cleanDesc),
                    publishDate: item.pubDate,
                    externalUrl: item.link,
                    source: source.name,
                    isLive: true
                };
            });
        });

        const results = await Promise.all(promises);
        const allNews = results.flat();

        // Filter duplicates based on title
        const uniqueNews = allNews.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i);

        // Sort by date (newest first)
        uniqueNews.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

        return uniqueNews;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};
