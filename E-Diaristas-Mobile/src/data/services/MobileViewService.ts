import { ScrollView } from 'react-native';

export const MobileViewService = {
    scrollToTop(scrollView?: ScrollView | null): void {
        if (scrollView) {
            scrollView.scrollTo({
                x: 0,
                y: 0,
                animated: true,
            });
        }
    },
};
