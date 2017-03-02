/**
 * Tweeki-specific scripts
 */

jQuery( function( $ ) {

	/**
	 * FOOTER
	 */
	// move sticky footer to bottom if the document is smaller than window
	function checkFooter() {
		if( $( '#footer.footer-sticky' ).length == 1 ) { // only if footer is sticky
			$( 'body' ).css( 'margin-bottom', 0 );
			// TODO: value shouldn't be hardcoded - use padding on #contentwrapper instead
			var minmargin = 50;
			var currentmargin = $( '#footer.footer-sticky' ).css( 'margin-top' );
			currentmargin = Number( currentmargin.replace( 'px', '' ) );
			var additionalmargin = $( window ).height() - $( 'body' ).height();
			var newmargin = Math.max( currentmargin + additionalmargin, minmargin );
			$( '#footer.footer-sticky' ).css( 'margin-top', newmargin + 'px' );
		}
	}

	// fade in initially hidden sticky footer
	checkFooter();
	$( '#footer.footer-sticky' ).animate( { opacity: 1 }, 1000 );

	// correct sticky footer on resize
	$(window).resize(function() {
		checkFooter();
	});

	// correct bottom margin for body when fixed footer
	if ( $( '#footer.footer-fixed' ).length == 1 ) {
		var footerheight = $( '#footer' ).outerHeight();
		$( 'body' ).css( 'margin-bottom', footerheight );
	}


	/**
	 * TOC
	 */
	// move TOC elsewhere
	if ( $( "#tweekiTOC" ).length == 1 && $( "#toc" ).length == 1 ) {
		var $presections = [];
		var ispre = true;
		var $postsections = [];
		var $thisSection;
		$( "#textbook-sections" ).children().each(function( index ) {
			if (ispre) {
				if ($( this ).data('thissection') === true) {
					ispre = false;
					$thisSection = '<li>' + $( this ).text() + '</li>';
				} else {
					$presections.push('<li><a href="/index.php/'+ $( this ).text() + '">' + $( this ).text() + '</a></li>');
				}
			} else {
				$postsections.push('<li><a href="/index.php/'+ $( this ).text() + '">' + $( this ).text() + '</a></li>');
			}
		});
		$( "#toc>ul" ).prepend($thisSection);
		$( "#toc>ul" ).prepend($presections);
		$( "#toc>ul" ).append($postsections);
		// to other place than sidebar?
		if ( $( "#tweekiTOC" ).parents( ".sidebar-wrapper" ).length != 1 ) {
			$( "#toc li" ).appendTo( "#tweekiTOC" );
			$( "#tweekiDropdownTOC" ).show();
		}
		// or to sidebar?
		else {
			$( "#toc" ).appendTo( "#tweekiTOC" );
			$( "#toctitle" ).insertBefore( "#toc" ).children( "h2" )
				.append( '<a href="javascript:scrollTo(0,0);">' + mw.message( 'tweeki-toc-top' ).plain() + '</a>' );
			/* do we need this? could cause problems on small screens */
			/* $(window).resize(function() {
				$("#tweekiTOC").height($(window).height()-$("#tweekiTOC").position().top-130);
			}).resize(); */

			// show toc (hidden by default)
			$( "#toc" ).css( 'display', 'table' );

			// start scrollspy
			$( '#toc ul' ).addClass( 'nav' );
			$( 'body' ).css( 'position', 'relative' ).scrollspy( { target: '#toc' } );
			}
		}


	/**
	 * LOGIN-EXT
	 */
	// don't close dropdown when clicking in the login form
	$( "#loginext" ).click( function( e ) {
    e.stopPropagation();
		});
	// focus user name field
	$( "#n-login-ext" ).click( function() {
		if( ! $( this ).parent().hasClass( "open" ) ) {
			setTimeout( '$( "#wpName2" ).focus();', 100 );
			}
		});
	});
