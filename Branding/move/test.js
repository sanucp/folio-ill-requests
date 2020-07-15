<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript">
	jQuery(window.parent.document).ready(function(){
			try 
			{	
                var c1 = jQuery("#ctl00_ctl00_Column2_Column2_relatedInfo_relInfoContainer_ctl05_panelContent", window.parent.document);
                jQuery("#ctl00_ctl00_Column2_Column2_relatedInfo_relInfoContainer_ctl05_panelContent", window.parent.document).remove();
                jQuery("#ctl00_ctl00_Column2_Column2_relatedInfo_relInfoContainer_ctl05_panelHeader", window.parent.document).remove();
				jQuery("#ctl00_ctl00_Column2_Column2_relatedInfo_relInfoContainer_ctl03_panelHeader", window.parent.document).before(c1);
                jQuery("#ctl00_ctl00_Column2_Column2_relatedInfo_relInfoContainer_ctl05_panelHeader", window.parent.document).css("display","none");
				jQuery('.related-info-area:contains("cluster")', window.parent.document).css("display","none");
			} 
			catch (err) 
			{ }
	});		
</script>