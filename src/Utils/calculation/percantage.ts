export const Percentage = (duration: Number | string, progress: Number | string) => {
    if (!duration || !progress) {
        return 0;
    }
    let percentage = Number(progress) / Number(duration)   * 100;
    return Math.round(percentage);
}