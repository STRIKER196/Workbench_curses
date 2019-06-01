

export const getInputFromHTMLElement = ( element ) => {
    if( !( 'rawAttrs' in element ) ){
        return false;
    }
    const startIndex = element.rawAttrs.indexOf( "value=\"" ) + 7;
    const endIndex = element.rawAttrs.indexOf( '\"', startIndex );
    const value = element.rawAttrs.substring( startIndex, endIndex );
    return value;
}
