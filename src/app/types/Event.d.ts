/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Event {
  /**
   * The identifier for the Event object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case ods:Event
   */
  "@type": "ods:Event";
  /**
   * https://rs.tdwg.org/dwc/terms/organismQuantity
   */
  "dwc:organismQuantity"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/organismQuantityType
   */
  "dwc:organismQuantityType"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/sex
   */
  "dwc:sex"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/lifeStage
   */
  "dwc:lifeStage"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/reproductiveCondition
   */
  "dwc:reproductiveCondition"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/behavior
   */
  "dwc:behavior"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/caste
   */
  "dwc:caste"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/vitality
   */
  "dwc:vitality"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/establishmentMeans
   */
  "dwc:establishmentMeans"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/occurrenceStatus
   */
  "dwc:occurrenceStatus"?: "present" | "absent";
  /**
   * https://rs.tdwg.org/dwc/terms/pathway
   */
  "dwc:pathway"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/degreeOfEstablishment
   */
  "dwc:degreeOfEstablishment"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/georeferenceVerificationStatus
   */
  "dwc:georeferenceVerificationStatus"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/occurrenceRemarks
   */
  "dwc:occurrenceRemarks"?: string;
  /**
   * The name of the event
   */
  "ods:eventName"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/fieldNumber
   */
  "dwc:fieldNumber"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/recordNumber
   */
  "dwc:recordNumber"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/eventType
   */
  "dwc:eventType"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/eventDate
   */
  "dwc:eventDate"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/eventTime
   */
  "dwc:eventTime"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/endDayOfYear
   */
  "dwc:endDayOfYear"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/startDayOfYear
   */
  "dwc:startDayOfYear"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/verbatimEventDate
   */
  "dwc:verbatimEventDate"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/year
   */
  "dwc:year"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/month
   */
  "dwc:month"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/day
   */
  "dwc:day"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/habitat
   */
  "dwc:habitat"?: string;
  /**
   * https://rs.tdwg.org/eco/terms/protocolDescriptions
   */
  "eco:protocolDescriptions"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/sampleSizeValue
   */
  "dwc:sampleSizeValue"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/sampleSizeUnit
   */
  "dwc:sampleSizeUnit"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/samplingProtocol
   */
  "dwc:samplingProtocol"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/samplingEffort
   */
  "dwc:samplingEffort"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/fieldNotes
   */
  "dwc:fieldNotes"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/eventRemarks
   */
  "dwc:eventRemarks"?: string;
  /**
   * The full name of the collector
   */
  "ods:collectorName"?: string;
  /**
   * The identifier of the collector, recommended would be a ORCID or Wikidata ID
   */
  "ods:collectorID"?: string;
  /**
   * Contains zero or more ods:Assertion objects
   */
  "ods:hasAssertion"?: Assertion[];
  "ods:Location"?: Location;
}
export interface Assertion {
  /**
   * The identifier for the Assertion object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Assertion
   */
  "@type": "ods:Assertion";
  /**
   * https://rs.tdwg.org/dwc/terms/measurementID
   */
  "dwc:measurementID"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/parentMeasurementID
   */
  "dwc:parentMeasurementID"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/measurementType
   */
  "dwc:measurementType"?: string;
  /**
   * https://rs.tdwg.org/dwc/iri/measurementType
   */
  "dwciri:measurementType"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/measurementDeterminedDate
   */
  "dwc:measurementDeterminedDate"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/measurementValue
   */
  "dwc:measurementValue"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/measurementValue
   */
  "dwciri:measurementValue"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/measurementAccuracy
   */
  "dwc:measurementAccuracy"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/measurementUnit
   */
  "dwc:measurementUnit"?: string;
  /**
   * https://rs.tdwg.org/dwc/iri/measurementUnit
   */
  "dwciri:measurementUnit"?: string;
  "ods:AssertionByAgent"?: Agent;
  /**
   * The protocol used to make the assertion
   */
  "ods:assertionProtocol"?: string;
  /**
   * The ID of the protocol used to make the assertion
   */
  "ods:assertionProtocolID"?: string;
  /**
   * Remarks about the assertion
   */
  "ods:assertionRemarks"?: string;
}
/**
 * The agent who made the assertion, contains an ods:Agent object
 */
export interface Agent {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o createUpdateTombstoneEvent
   */
  "@type": "schema:Person" | "schema:Organisation" | "as:Application" | "prov:Person" | "prov:SoftwareAgent";
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Indicates the role of the agent, https://schema.org/roleName
   */
  "schema:roleName"?: string;
  /**
   * Date the agent began the role
   */
  "schema:startDate"?: string;
  /**
   * Date the agent ended the role
   */
  "schema:endDate"?: string;
  /**
   * Order of the agent in the role. Can be used to indicate the order of importance
   */
  "ods:roleOrder"?: number;
  /**
   * Email of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:email"?: string;
  /**
   * URL of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:url"?: string;
  /**
   * Contains zero or more ods:Identifier objects
   */
  "ods:hasIdentifier"?: Identifier[];
}
/**
 * Based on https://rs.gbif.org/extension/gbif/1.0/identifier.xml but includes ods specific terms
 */
export interface Identifier {
  /**
   * The identifier for the Identifier object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Identifier
   */
  "@type": "ods:Identifier";
  /**
   * The type of the identifier, https://purl.org/dc/elements/1.1/title
   */
  "dcterms:title": string;
  /**
   * The local title of the identifier
   */
  "ods:localTitle"?: string;
  /**
   * The value for the identifier, https://purl.org/dc/terms/identifier
   */
  "dcterms:identifier": string;
  /**
   * Mime type of content returned by identifier in case the identifier is resolvable. https://purl.org/dc/terms/format
   */
  "dcterms:format"?: string;
  /**
   * Keywords qualifying the identifier https://purl.org/dc/terms/subject
   */
  "dcterms:subject"?: string;
  /**
   * Indicates whether the identifier is part of the physical label
   */
  "ods:isPartOfLabel"?: boolean;
  /**
   * Indicates whether the identifier is part of the barcode or nfc chip
   */
  "ods:isBarcodeOrNFC"?: boolean;
  /**
   * Indicates whether the identifier is a persistent identifier
   */
  "ods:isIDPersistent"?: boolean;
}
/**
 * Contains an object of type ods:Location
 */
export interface Location {
  /**
   * The identifier for the Location object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Location
   */
  "@type": "ods:Location";
  /**
   * https://rs.tdwg.org/dwc/terms/locationID
   */
  "dwc:locationID"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/continent
   */
  "dwc:continent"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/waterBody
   */
  "dwc:waterBody"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/islandGroup
   */
  "dwc:islandGroup"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/island
   */
  "dwc:island"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/country
   */
  "dwc:country"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/countryCode
   */
  "dwc:countryCode"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/stateProvince
   */
  "dwc:stateProvince"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/county
   */
  "dwc:county"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/municipality
   */
  "dwc:municipality"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/locality
   */
  "dwc:locality"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/verbatimLocality
   */
  "dwc:verbatimLocality"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/minimumElevationInMeters
   */
  "dwc:minimumElevationInMeters"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/higherGeographyID
   */
  "dwc:higherGeographyID"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/higherGeography
   */
  "dwc:higherGeography"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/maximumElevationInMeters
   */
  "dwc:maximumElevationInMeters"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/verbatimElevation
   */
  "dwc:verbatimElevation"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/minimumDistanceAboveSurfaceInMeters
   */
  "dwc:minimumDistanceAboveSurfaceInMeters"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/maximumDistanceAboveSurfaceInMeters
   */
  "dwc:maximumDistanceAboveSurfaceInMeters"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/minimumDepthInMeters
   */
  "dwc:minimumDepthInMeters"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/maximumDepthInMeters
   */
  "dwc:maximumDepthInMeters"?: number;
  /**
   * https://rs.tdwg.org/dwc/terms/verbatimDepth
   */
  "dwc:verbatimDepth"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/verticalDatum
   */
  "dwc:verticalDatum"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/locationAccordingTo
   */
  "dwc:locationAccordingTo"?: string;
  /**
   * https://rs.tdwg.org/dwc/terms/locationRemarks
   */
  "dwc:locationRemarks"?: string;
  /**
   * An object which describes the geographical reference of the location of the specimen.
   */
  "ods:GeoReference"?: {
    /**
     * The identifier for the Geo Reference object.
     */
    "@id"?: string;
    /**
     * The type of the object, in this case ods:GeoReference
     */
    "@type": "ods:GeoReference";
    /**
     * https://rs.tdwg.org/dwc/terms/verbatimCoordinates
     */
    "dwc:verbatimCoordinates"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/decimalLatitude
     */
    "dwc:decimalLatitude"?: number;
    /**
     * https://rs.tdwg.org/dwc/terms/verbatimLatitude
     */
    "dwc:verbatimLatitude"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/decimalLongitude
     */
    "dwc:decimalLongitude"?: number;
    /**
     * https://rs.tdwg.org/dwc/terms/verbatimLongitude
     */
    "dwc:verbatimLongitude"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/verbatimCoordinateSystem
     */
    "dwc:verbatimCoordinateSystem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/geodeticDatum
     */
    "dwc:geodeticDatum"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters
     */
    "dwc:coordinateUncertaintyInMeters"?: number;
    /**
     * https://rs.tdwg.org/dwc/terms/coordinatePrecision
     */
    "dwc:coordinatePrecision"?: number;
    /**
     * https://rs.tdwg.org/dwc/terms/pointRadiusSpatialFit
     */
    "dwc:pointRadiusSpatialFit"?: number;
    /**
     * https://rs.tdwg.org/dwc/terms/footprintWKT
     */
    "dwc:footprintWKT"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/footprintSRS
     */
    "dwc:footprintSRS"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/verbatimSRS
     */
    "dwc:verbatimSRS"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/footprintSpatialFit
     */
    "dwc:footprintSpatialFit"?: number;
    /**
     * https://rs.tdwg.org/dwc/terms/georeferencedBy
     */
    "dwc:georeferencedBy"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/georeferencedDate
     */
    "dwc:georeferencedDate"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/georeferenceProtocol
     */
    "dwc:georeferenceProtocol"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/georeferenceSources
     */
    "dwc:georeferenceSources"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/georeferenceRemarks
     */
    "dwc:georeferenceRemarks"?: string;
  };
  /**
   * An object which describes the geological context of th location of the specimen.
   */
  "ods:GeologicalContext"?: {
    /**
     * The identifier for the Geological Context object.
     */
    "@id"?: string;
    /**
     * The type of the object, in this case ods:GeologicalContext
     */
    "@type": "ods:GeologicalContext";
    /**
     * https://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem
     */
    "dwc:earliestEonOrLowestEonothem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem
     */
    "dwc:latestEonOrHighestEonothem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem
     */
    "dwc:earliestEraOrLowestErathem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem
     */
    "dwc:latestEraOrHighestErathem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem
     */
    "dwc:earliestPeriodOrLowestSystem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem
     */
    "dwc:latestPeriodOrHighestSystem"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries
     */
    "dwc:earliestEpochOrLowestSeries"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries
     */
    "dwc:latestEpochOrHighestSeries"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage
     */
    "dwc:earliestAgeOrLowestStage"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage
     */
    "dwc:latestAgeOrHighestStage"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/lowestBiostratigraphicZone
     */
    "dwc:lowestBiostratigraphicZone"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/highestBiostratigraphicZone
     */
    "dwc:highestBiostratigraphicZone"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/lithostratigraphicTerms
     */
    "dwc:lithostratigraphicTerms"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/group
     */
    "dwc:group"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/formation
     */
    "dwc:formation"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/member
     */
    "dwc:member"?: string;
    /**
     * https://rs.tdwg.org/dwc/terms/bed
     */
    "dwc:bed"?: string;
  };
}
