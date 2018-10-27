define( [ 'commonUtil/Globals', 'commonUtil/Logger' ], function ( globals, Logger ) {
    //### Description  
    //Cookie utility class for managing cookies
    //consolidate/cleanup cookie functionality  
    //http://www1.macys.com/javascript/cookieJar.js and  
    //http://www1.macys.com/web20/assets/script/macys/./cookie-min.js
    //and http://www1.macys.com/web20/assets/script/yahoo/cookie/cookie-beta-min.js  
    //and http://www1.macys.com/web20/assets/script/macys/base/cmFunctions.js  
    //cookie and store up to 4K  
    //Group cookies; decrease time to access groups in cookie  
    //macys.com cookie reference on confluence  
    //http://confluence/display/WDS/current+macys+cookies  

    //###constants  
    //description of cookie constants to follow  
    //example  
    var MVC_SEPARATOR = "3_87_",
        MVC_EQUATOR = "1_92_",
        MVC_EMPTY_STRING = "4_02_",

        //###properties  
        //description of cookie properties to follow  
        path = "/",
        expires = null,
        secure = false,
        Cookie = {};

    // we want to decode the data in the cookie
    // but we want to call this only once
    // this is for browsers that do not have decodeURIComponent
    if ( typeof window.decodeURIComponent === "undefined" ) {
        window.decodeURIComponent = ( typeof window.decodeURI === "undefined" ) ? window.unescape : window.decodeURI;
    }

    // we want to encode the data in the cookie
    // but we want to call this only once
    // this is for browsers that do not have encodeURLComponent
    if ( typeof encodeURIComponent === "undefined" ) {
        window.encodeURIComponent = ( typeof window.encodeURI === "undefined" ) ? window.escape : window.encodeURI;
    }

    // thanks to the dev who initially added this, why could I not unset the expires?  
    Cookie.setExpires = function ( str ) {
        if ( typeof str === 'undefined' ) {
            expires = new Date().toString();
        } else {
            expires = str;
        }
        return expires;
    };

    //###Cookie.parse([cookieString])
    //[optional] cookieString   
    //description to follow  
    // taken in part from YUI 3.4.1 _parseCookieString  
    //addtion parse documentation goes here  
    Cookie.parse = function ( cookieString ) {
        var j, cookies, clen, rmap = {},
            dc, cparts, cname, cvalue;

        // where we get the cookies
        dc = cookieString || document.cookie;
        cookies = dc.split( /;\s/g );
        clen = cookies.length;
        // put all cookies in an object
        for ( j = 0; j < clen; j += 1 ) {
            cparts = cookies[ j ].match( /([^=]+)=/i );
            try {
                if ( cparts instanceof Array ) {
                    cname = decodeURIComponent( cparts[ 1 ] );
                    cvalue = decodeURIComponent( cookies[ j ].substring( cparts[ 1 ].length + 1 ) );
                } else {
                    cname = decodeURIComponent( cookies[ j ] );
                    cvalue = "";
                }
                rmap[ cname.replace( / /g, '' ) ] = cvalue;
            } catch ( e ) {
                //ignore it.
                Logger.warn( 'Error happened while parsing cookie string: ', cookies[ j ], e );
            }
        }
        return rmap;
    };

    //###Cookie.get(name, [multiValueCookie])
    //name the name of the cookie to get   
    //[optional] multiValueCookie   
    Cookie.get = function ( name, multiValueCookie ) {
        var result,
            hash, mvcParts, plen, j, items;
        // hash will always be an object but may not have props
        hash = this.parse();
        if ( typeof multiValueCookie !== "undefined" ) {
            if ( hash[ multiValueCookie ] ) {
                mvcParts = hash[ multiValueCookie ].split( MVC_SEPARATOR );
                plen = mvcParts.length;
                for ( j = 0; j < plen; j++ ) {
                    items = mvcParts[ j ].split( MVC_EQUATOR );
                    if ( items[ 0 ] === name ) {
                        result = ( items[ 1 ] === MVC_EMPTY_STRING ) ? "" : items[ 1 ];
                        break;
                    }
                }
            }
        } else {
            result = hash[ name ];
        }
        return result;
    };

    function buildMVCValue( multiValueCookie, name, value ) {
        var mvcValue, subCookie, mvcSubs, j,
            resultValue, slen, pairs;
        // get the whole multi value cookie
        mvcValue = Cookie.get( multiValueCookie );
        subCookie = name + MVC_EQUATOR + ( ( value === "" ) ? MVC_SEPARATOR : value );
        if ( !mvcValue || mvcValue === null ) {
            // no cookie with the multiValueCookie name
            resultValue = subCookie;
        } else if ( mvcValue.indexOf( name ) === -1 ) {
            // multiValueCookie exists but the name value pair we want does not
            resultValue = mvcValue + MVC_SEPARATOR + subCookie;
        } else {
            // multiValueCookie exists and there is a sub cookie with that name 
            mvcSubs = mvcValue.split( MVC_SEPARATOR );
            slen = mvcSubs.length;
            for ( j = 0; j < slen; j++ ) {
                pairs = mvcSubs[ j ].split( MVC_EQUATOR );
                if ( pairs[ 0 ] === name ) {
                    mvcSubs[ j ] = name + MVC_EQUATOR + value;
                }
            }
            resultValue = mvcSubs.join( MVC_SEPARATOR );
        }
        return resultValue;
    }

    //###Method:
    //Will format a string to standard cookie domain values.  In particular, will take in string.  If none is passed in
    //then will attempt to pull domain value from configuration.
    //If it is passed in, then it will first check for at least two dots, and if found, return wild carded domain.
    Cookie.formatDomainForCookie = function ( host ) {
        var urlArray, domain, domainInput, globalsBaseHost;
        if ( typeof host === 'string' && host.length > 0 ) {

            if ( host.indexOf( ".", host.indexOf( ".", 0 ) + 1 ) > 1 ) {
                domain = host.indexOf( ".", 0 ) > 0 ? host.substring( host.indexOf( ".", 0 ) ) : host;
            } else {
                domain = '';
            }
        } else {
            globalsBaseHost = globals.getValue( 'props.cookieDomain' );
            if ( typeof domain === 'undefined' || domain === null ) {
                domain = ( typeof globalsBaseHost !== "undefined" ) ? globalsBaseHost : undefined;
            }
            if ( typeof domain === 'undefined' || domain === null ) {
                domain = window.location.hostname.replace( /^www[1]?\./gi, '' );
            }
        }
        //remove port for local testing
        domain = ( domain && domain.indexOf( ":" ) !== -1 ) ? domain.substring( 0, domain.indexOf( ":" ) ) : domain;
        return domain;
    };


    //###Cookie.set(name, value, [multiValueCookie], [options])  
    //[optional] multiValueCookie, options
    //description to follow  
    //>options - could be Date or object
    //>example: {expires: expiryDate, path: "/signin", domain: "fds.com", secure: true}    
    Cookie.set = function ( name, value, multiValueCookie, options ) {
        var domainInput, self, data, encodeValue, setName = name;

        value = typeof value === "boolean" ? value.toString() : value;
        if ( typeof value === 'undefined' || value === null ) {
            if ( !multiValueCookie ) {
                return false;
            }
            // mvc cookie can have undefined or null value but it should be set to this 
            value = MVC_EMPTY_STRING;
        }

        encodeValue = value;
        if ( multiValueCookie ) {
            setName = multiValueCookie;
            if ( value === '' ) {
                value = MVC_EMPTY_STRING;
            }
            encodeValue = buildMVCValue( multiValueCookie, name, value );
        }

        data = encodeURIComponent( setName ) + "=" + encodeURIComponent( encodeValue );

        if ( options ) {
            //this is for backward compatibility
            if ( options.constructor === Date ) {
                expires = options.toGMTString();
            }
            //this is for new implementation
            else {
                if ( options.expires ) {
                    expires = options.expires;

                    if ( expires.constructor === Date ) {
                        expires = expires.toGMTString();
                    }
                }
                if ( options.path ) {
                    path = options.path;
                }
                if ( options.secure ) {
                    secure = options.secure;
                }
            }
        }

        if ( expires ) {
            data += "; expires=" + expires;
        }
        data += "; path=" + path;

        var domain = Cookie.formatDomainForCookie( options ? options.domain || '' : '' );
        if ( domain && domain.length ) {
            data += "; domain=" + domain;
        }
        if ( secure ) {
            data += ";secure=" + secure;
        }
        document.cookie = data;

        expires = null;

        return true;
    };

    //###Cookie.remove(name, [multiValueCookie])
    //name the name of the cookie to remove   
    //[optional] multiValueCookie   
    Cookie.remove = function ( name, multiValueCookie, options ) {
        var mvcValue, mvcSubs, newValue, j, self, mvcParts;
        if ( multiValueCookie ) {
            mvcValue = this.get( multiValueCookie );
            if ( mvcValue && mvcValue.indexOf( name ) !== -1 ) {
                mvcSubs = mvcValue.split( MVC_SEPARATOR );
                newValue = "";
                for ( j = 0; j < mvcSubs.length; j++ ) {
                    mvcParts = mvcSubs[ j ].split( MVC_EQUATOR );
                    if ( mvcParts[ 0 ] !== name ) {
                        if ( newValue !== "" ) {
                            newValue += MVC_SEPARATOR;
                        }
                        newValue += mvcSubs[ j ];
                    }
                }
                this.set( multiValueCookie, newValue, undefined, options );
            }
        } else {
            // set expires to yesterday 
            expires = new Date( new Date().getTime() - 86400000 );
            Cookie.set( name, "", undefined, options );
            expires = null;
        }
    };

    //###Cookie.getCountryCode()
    //Will retun Shipping Country
    Cookie.getCountryCode = function () {
        var countryCode;
        if ( countryCode === undefined ) {
            countryCode = Cookie.get( "shippingCountry" );
            if ( !countryCode ) {
                countryCode = null;
            }
        }

        return countryCode;
    };

    //###Cookie.getCountryCode()
    //Will return Currency Code
    Cookie.getCurrencyCode = function () {
        var currencyCode;
        if ( currencyCode === undefined ) {
            currencyCode = Cookie.get( "currency" );
            if ( !currencyCode ) {
                currencyCode = null;
            }
        }

        return currencyCode;
    };

    //###Cookie.isInternationalMode()
    //Will return Boolean if is / isn't International Mode
    Cookie.isInternationalMode = function () {
        var isInternational, shippingCountry;
        if ( isInternational === undefined ) {
            isInternational = false;

            shippingCountry = Cookie.getCountryCode();

            if ( shippingCountry ) {
                isInternational = ( shippingCountry !== 'US' );
            }

        }

        return isInternational;
    };

    //###Cookie.getCustomerId()
    //Will return Customer Online UID if exsits or 0000000000 for testing purpose
    Cookie.getSessionId = function () {
        var sessionId;
        if ( sessionId === undefined ) {
            sessionId = Cookie.get( "bloomingdales_online_uid" ) || Cookie.get( "macys_online_uid" ) || "0000000000";
        }
        return sessionId;
    };
    return Cookie;
} );