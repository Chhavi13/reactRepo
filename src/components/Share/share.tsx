
export const shareUrl = (url: any) => {
    if (navigator.share) {
        navigator.share({
            title: 'web',
            text: 'Tokuten',
            url: `https://creator.tokuten.ai/${url}`,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
}