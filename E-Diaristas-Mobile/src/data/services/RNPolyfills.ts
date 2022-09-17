import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

if (!String.prototype.replaceAll) {
    // @ts-ignore
    String.prototype.replaceAll = function (str: string, newStr: string) {
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}
