<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:opf="http://www.idpf.org/2007/opf"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:fn="http://www.w3.org/2005/xpath-functions">
    <xsl:output method="text" />

    <xsl:param name="width" select="0" />
    <xsl:param name="height" select="0" />
    <xsl:param name="image" select="''" />

    <xsl:param name="azw" select="''" />
    <xsl:param name="epub" select="''" />
    <xsl:param name="mobi" select="''" />
    <xsl:param name="pdf" select="''" />

    <xsl:template match="/opf:package">
        <xsl:text>{&#10;</xsl:text>

        <xsl:apply-templates select="opf:metadata/dc:identifier[@id='uuid_id']" />

        <xsl:text>  "title": "</xsl:text>
        <xsl:value-of select="opf:metadata/dc:title"/>
        <xsl:text>",&#10;</xsl:text>

        <xsl:text>  "author": [&#10;</xsl:text>
        <xsl:for-each select="opf:metadata/dc:creator[@opf:role='aut']">
            <xsl:text>    "</xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>"</xsl:text>
            <xsl:choose>
                <xsl:when test="position()!=last()"><xsl:text>,</xsl:text></xsl:when>
            </xsl:choose>
            <xsl:text>&#10;</xsl:text>
        </xsl:for-each>
        <xsl:text>  ],&#10;</xsl:text>

        <xsl:text>  "description": "</xsl:text>
        <xsl:call-template name="clean">
            <xsl:with-param name="value" select="opf:metadata/dc:description" />
        </xsl:call-template>
        <xsl:text>",&#10;</xsl:text>

        <xsl:text>  "publisher": "</xsl:text>
        <xsl:call-template name="clean">
            <xsl:with-param name="value" select="opf:metadata/dc:publisher" />
        </xsl:call-template>
        <xsl:text>",&#10;</xsl:text>

        <xsl:text>  "publication_date": "</xsl:text>
        <xsl:call-template name="yearonly">
            <xsl:with-param name="value" select="opf:metadata/dc:date" />
        </xsl:call-template>
        <xsl:text>",&#10;</xsl:text>

        <xsl:call-template name="cover" />

        <xsl:text>  "editions": [&#10;</xsl:text>
        <xsl:call-template name="edition">
            <xsl:with-param name="format" select="'azw'"/>
            <xsl:with-param name="url" select="$azw"/>
            <xsl:with-param name="withcomma" select="fn:string-length(fn:string-join(($epub,$mobi,$pdf), ''))" />
        </xsl:call-template>
        <xsl:call-template name="edition">
            <xsl:with-param name="format" select="'epub'"/>
            <xsl:with-param name="url" select="$epub"/>
            <xsl:with-param name="withcomma" select="fn:string-length(fn:string-join(($mobi,$pdf), ''))" />
        </xsl:call-template>
        <xsl:call-template name="edition">
            <xsl:with-param name="format" select="'mobi'"/>
            <xsl:with-param name="url" select="$mobi"/>
            <xsl:with-param name="withcomma" select="fn:string-length(fn:string-join(($pdf), ''))" />
        </xsl:call-template>
        <xsl:call-template name="edition">
            <xsl:with-param name="format" select="'pdf'"/>
            <xsl:with-param name="url" select="$pdf" />
            <xsl:with-param name="withcomma" select="0" />
        </xsl:call-template>
        <xsl:text>  ],&#10;</xsl:text>

        <xsl:text>  "subject": [&#10;</xsl:text>
        <xsl:for-each select="opf:metadata/dc:subject">
            <xsl:text>    "</xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>"</xsl:text>
            <xsl:choose>
                <xsl:when test="position()!=last()"><xsl:text>,</xsl:text></xsl:when>
            </xsl:choose>
            <xsl:text>&#10;</xsl:text>
        </xsl:for-each>
        <xsl:text>  ]&#10;</xsl:text>

        <xsl:text>}&#10;</xsl:text>
    </xsl:template>

    <xsl:template match="opf:metadata/dc:identifier[@id='uuid_id']">
        <xsl:text>  "id": "</xsl:text>
        <xsl:value-of select="."/>
        <xsl:text>",&#10;</xsl:text>
    </xsl:template>

    <xsl:template name="cover">
        <xsl:text>  "coverImage": {&#10;</xsl:text>
        <xsl:text>    "imageSrc": "</xsl:text>
        <xsl:value-of select="$image"/>
        <xsl:text>",&#10;</xsl:text>
        <xsl:text>    "width": </xsl:text>
        <xsl:value-of select="$width" />
        <xsl:text>,&#10;</xsl:text>
        <xsl:text>    "height": </xsl:text>
        <xsl:value-of select="$height" />
        <xsl:text>&#10;</xsl:text>
        <xsl:text>  },&#10;</xsl:text>
    </xsl:template>

    <xsl:template name="edition">
        <xsl:param name="format" />
        <xsl:param name="url" />
        <xsl:param name="withcomma" select="0" />

        <xsl:if test="$url != ''">
            <xsl:text>    {&#10;</xsl:text>
            <xsl:text>      "format": "</xsl:text>
            <xsl:value-of select="$format" />
            <xsl:text>",&#10;</xsl:text>
            <xsl:text>      "url": "</xsl:text>
            <xsl:value-of select="$url" />
            <xsl:text>"&#10;    }</xsl:text>
            <xsl:if test="$withcomma != 0">
                <xsl:text>,</xsl:text>
            </xsl:if>
            <xsl:text>&#10;</xsl:text>
        </xsl:if>
    </xsl:template>

    <xsl:template name="clean">
        <xsl:param name="value" />

        <xsl:value-of select="fn:replace(fn:replace($value, '&quot;', ''), '[\r\n]+', '\\n')"/>
    </xsl:template>

    <xsl:template name="yearonly">
        <xsl:param name="value" />

        <xsl:variable name="pubdate" select="fn:format-dateTime($value, '[Y0001]')" />

        <xsl:if test="$pubdate > 1700">
            <xsl:value-of select="$pubdate" />
        </xsl:if>
    </xsl:template>
</xsl:stylesheet>