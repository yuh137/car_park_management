export function validateTime(inputTime: Date): number {
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - inputTime.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;

    // return 0
}