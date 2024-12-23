/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Information about the Annotation data model. This model has been based on the W3C Web Annotation model
 */
export interface Annotation {
  /**
   * The unique identifier (handle) of the Annotation object
   */
  "@id": string;
  /**
   * The type of the object, in this case ods:Annotation
   */
  "@type": "ods:Annotation";
  /**
   * The handle of the annotation. It is a unique identifier for the annotation. It is composed of the handle of the document followed by a slash and a unique identifier for the annotation.
   */
  "dcterms:identifier": string;
  /**
   * The DOI to the FDO type of the object
   */
  "ods:fdoType"?: string;
  /**
   * The status of the Digital Object. A digital object can be in Draft, when it is not published yet. Active when it is published and the object is active and Tombstone which means the object has been archived.
   */
  "ods:status"?: "Draft" | "Active" | "Tombstone";
  /**
   * Handle of the job record, if the annotation was produced by a Machine Annotation Service, only filled when annotation was created by a MAS
   */
  "ods:jobID"?: string;
  /**
   * The version of the object, each change generates a new version. The version starts at 1 and each change will increment the version number with 1
   */
  "ods:version": number;
  /**
   * The motivation for why an annotation was proposed. Based on a selection of https://www.w3.org/TR/annotation-model/#motivation-and-purpose. The motivation ods:adding and ods:deleting are added for DiSSCo's purposes.
   */
  "oa:motivation": "ods:adding" | "ods:deleting" | "oa:assessing" | "oa:editing" | "oa:commenting";
  /**
   * Describes the reason for the annotation
   */
  "oa:motivatedBy"?: string;
  "oa:hasTarget": AnnotationTarget;
  "oa:hasBody": AnnotationBody;
  "dcterms:creator": Agent;
  /**
   * The date and time when the annotation was created, following the ISO Date Time Format yyyy-MM-dd'T'HH:mm:ss.SSSXXX
   */
  "dcterms:created": string;
  /**
   * The date and time when the annotation was last modified, generating a new version. Following the ISO Date Time Format yyyy-MM-dd'T'HH:mm:ss.SSSXXX
   */
  "dcterms:modified": string;
  /**
   * The date and time when the annotation was generated. Generated is here seen as when the object was stored/indexed. In most case this will be the annotation-processing-service. Following the ISO Date Time Format yyyy-MM-dd'T'HH:mm:ss.SSSXXX
   */
  "dcterms:issued": string;
  "as:generator": Agent1;
  /**
   * The average rating based on multiple ratings or reviews
   */
  "ods:hasAggregateRating"?: {
    /**
     * Indicates which type of aggregateRating we are using.
     */
    "@type": "schema:AggregateRating";
    /**
     * The count of total number of ratings
     */
    "schema:ratingCount": number;
    /**
     * The rating for the content
     */
    "schema:ratingValue": number;
  };
  /**
   * Internally generated PID to identify the batch the annotation was generated by
   */
  "ods:batchID"?: string;
  /**
   * For batching only. Links annotation to batchMetadata provided in a batch event. If present, must correspond to an ods:placeInBatch in the batch metadata
   */
  "ods:placeInBatch"?: number;
  /**
   * The merging status of the annotation. Only present when motivation is ods:adding or oa:editing
   */
  "ods:mergingDecisionStatus"?: "Pending" | "Rejected" | "Approved";
  /**
   * The date and time when the annotation was merging state was changed. Only present when motivation is ods:adding or oa:editing. Following the ISO Date Time Format yyyy-MM-dd'T'HH:mm:ss.SSSXXX
   */
  "ods:mergingStateChangeDate"?: string;
  "ods:hasMergingStateChangedBy"?: Agent2;
  "ods:hasTombstoneMetadata"?: TombstoneMetadata;
}
/**
 * Indicates the particular object and part of the object on which the annotation has been made
 */
export interface AnnotationTarget {
  /**
   * This is the PID of the target object. Valid targets are the Digital Specimen, Digital Media Object or another annotation.
   */
  "@id": string;
  /**
   * The type of the target object
   */
  "@type": string;
  /**
   * This is the PID of the target object. Valid targets are the Digital Specimen, Digital Media Object or another Annotation.
   */
  "dcterms:identifier": string;
  /**
   * This is the handle to the type of the target object.
   */
  "ods:fdoType": string;
  /**
   * Optional field to indicate the part of the target object that is being annotated. It can be a field, a class or a region of interest.
   */
  "oa:hasSelector"?:
    | {
        /**
         * A selector for an individual term
         */
        "@type": "ods:TermSelector";
        /**
         * The full jsonPath in block notation of the field being annotated. Following: https://goessner.net/articles/JsonPath/index.html#e2
         */
        "ods:term": string;
      }
    | {
        /**
         * A selector for an individual class
         */
        "@type": "ods:ClassSelector";
        /**
         * The full jsonPath in block notation of the class being annotated. Following: https://goessner.net/articles/JsonPath/index.html#e2
         */
        "ods:class": string;
      }
    | {
        /**
         * A selector for an specific Region of Interest (Roi). Only applicable on media objects.
         */
        "@type": "oa:FragmentSelector";
        /**
         * A region of interest located within the subject media item
         */
        "ac:hasROI": {
          /**
           * The horizontal position of a reference point, measured from the left side of the media item and expressed as a decimal fraction of the width of the media item
           */
          "ac:xFrac": number;
          /**
           * The vertical position of a reference point, measured from the top of the media item and expressed as a decimal fraction of the height of the media item
           */
          "ac:yFrac": number;
          /**
           * The width of the bounding rectangle, expressed as a decimal fraction of the width of the media item
           */
          "ac:widthFrac": number;
          /**
           * The height of the bounding rectangle, expressed as a decimal fraction of the height of the media item
           */
          "ac:heightFrac": number;
        };
        /**
         * Indicates the vocabulary that the ROI conforms to
         */
        "dcterms:conformsTo": "https://ac.tdwg.org/termlist/#711-region-of-interest-vocabulary";
      };
}
/**
 * The body of the annotation contains the specific value of the annotation
 */
export interface AnnotationBody {
  /**
   * The type of the object, in this case oa:TextualBody
   */
  "@type": "oa:TextualBody";
  /**
   * An array of multiple values in string representation specific for the particular selector. This value could contain a string representation of a json value.
   */
  "oa:value": string[];
  /**
   * Provides information on how the value was derived. This could be a link to a service that provided the value or a link to the source of the value.
   */
  "dcterms:references"?: string;
  /**
   * A score between 0 and 1 indicating the confidence in the value. 1 is the highest confidence and 0 is the lowest.
   */
  "ods:score"?: number;
}
/**
 * Contains information about the creator of the annotation
 */
export interface Agent {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o ods:CreateUpdateTombstoneEvent
   */
  "@type":
    | "schema:Person"
    | "schema:Organization"
    | "schema:SoftwareApplication"
    | "prov:Person"
    | "prov:SoftwareAgent";
  /**
   * The primary unique identifier of the Agent object. All identifiers will also be added to the ods:hasIdentifiers array
   */
  "schema:identifier"?: string;
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Contains all roles associated with the agent in the context of the Digital Object. Should always contain at least one role
   *
   * @minItems 1
   */
  "ods:hasRoles"?: [
    {
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    },
    ...{
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    }[]
  ];
  /**
   * Email of the agent
   */
  "schema:email"?: string;
  /**
   * URL to a website of the agent
   */
  "schema:url"?: string;
  /**
   * Contains all identifiers associated with the agent
   */
  "ods:hasIdentifiers"?: Identifier[];
}
/**
 * Object used to describe identifiers of a Digital Object, based on https://rs.gbif.org/extension/gbif/1.0/identifier.xml but includes ods specific terms
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
   * A name for the identifier
   */
  "dcterms:title": string;
  /**
   * The type of the value in the `dcterms:identifier` field
   */
  "dcterms:type"?:
    | "ARK"
    | "arXiv"
    | "bibcode"
    | "DOI"
    | "EAN13"
    | "EISSN"
    | "Handle"
    | "IGSN"
    | "ISBN"
    | "ISSN"
    | "ISTC"
    | "LISSN"
    | "LSID"
    | "PMID"
    | "PURL"
    | "UPC"
    | "URL"
    | "URN"
    | "w3id"
    | "UUID"
    | "Other"
    | "Locally unique identifier";
  /**
   * The value for the identifier
   */
  "dcterms:identifier": string;
  /**
   * All possible mime types of content that can be returned by identifier in case the identifier is resolvable. Plain UUIDs for example do not have a dc:format return type, as they are not resolvable on their own. For a list of MIME types see the list maintained by IANA: http://www.iana.org/assignments/media-types/index.html, in particular the text http://www.iana.org/assignments/media-types/text/ and application http://www.iana.org/assignments/media-types/application/ types. Frequently used values are text/html, text/xml, application/rdf+xml, application/json
   */
  "dcterms:format"?: string[];
  /**
   * Additional keywords that the publisher may prefer to be attached to the identifier
   */
  "dcterms:subject"?: string[];
  /**
   * Indicates whether the identifier is part of the physical label
   */
  "ods:isPartOfLabel"?: boolean;
  /**
   * Indicates whether the identifier is a persistent identifier
   */
  "ods:gupriLevel"?:
    | "LocallyUniqueStable"
    | "GloballyUniqueStable"
    | "GloballyUniqueStableResolvable"
    | "GloballyUniqueStablePersistentResolvable"
    | "GloballyUniqueStablePersistentResolvableFDOCompliant";
  /**
   * Indicates the status of the identifier
   */
  "ods:identifierStatus"?: "Preferred" | "Alternative" | "Superseded";
}
/**
 * Object containing information on who generated the object. Generated is here seen as who stored/indexed the object. In most case this will be the annotation-processing-service. Contains an ods:Agent object.
 */
export interface Agent1 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o ods:CreateUpdateTombstoneEvent
   */
  "@type":
    | "schema:Person"
    | "schema:Organization"
    | "schema:SoftwareApplication"
    | "prov:Person"
    | "prov:SoftwareAgent";
  /**
   * The primary unique identifier of the Agent object. All identifiers will also be added to the ods:hasIdentifiers array
   */
  "schema:identifier"?: string;
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Contains all roles associated with the agent in the context of the Digital Object. Should always contain at least one role
   *
   * @minItems 1
   */
  "ods:hasRoles"?: [
    {
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    },
    ...{
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    }[]
  ];
  /**
   * Email of the agent
   */
  "schema:email"?: string;
  /**
   * URL to a website of the agent
   */
  "schema:url"?: string;
  /**
   * Contains all identifiers associated with the agent
   */
  "ods:hasIdentifiers"?: Identifier[];
}
/**
 * Object containing information on who changed the merging state of the annotation. Only present when motivation is ods:adding or oa:editing. Contains an ods:Agent object.
 */
export interface Agent2 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o ods:CreateUpdateTombstoneEvent
   */
  "@type":
    | "schema:Person"
    | "schema:Organization"
    | "schema:SoftwareApplication"
    | "prov:Person"
    | "prov:SoftwareAgent";
  /**
   * The primary unique identifier of the Agent object. All identifiers will also be added to the ods:hasIdentifiers array
   */
  "schema:identifier"?: string;
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Contains all roles associated with the agent in the context of the Digital Object. Should always contain at least one role
   *
   * @minItems 1
   */
  "ods:hasRoles"?: [
    {
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    },
    ...{
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    }[]
  ];
  /**
   * Email of the agent
   */
  "schema:email"?: string;
  /**
   * URL to a website of the agent
   */
  "schema:url"?: string;
  /**
   * Contains all identifiers associated with the agent
   */
  "ods:hasIdentifiers"?: Identifier[];
}
/**
 * Object containing the tombstone metadata of the object. Only present when ods:status is ods:Tombstone
 */
export interface TombstoneMetadata {
  /**
   * The type of the record, in this case a ods:Tombstone
   */
  "@type": "ods:Tombstone";
  /**
   * Timestamp the Digital Object was tombstoned and no longer active. Following the ISO Date Time Format yyyy-MM-dd'T'HH:mm:ss.SSSXXX
   */
  "ods:tombstoneDate": string;
  /**
   * A reason why the Digital Object was tombstoned
   */
  "ods:tombstoneText": string;
  /**
   * The agent(s) who tombstoned the Digital Object, contains an ods:Agent object
   *
   * @minItems 1
   */
  "ods:hasAgents": [Agent3, ...Agent3[]];
  /**
   * The PIDs of the object the tombstoned object is related to
   */
  "ods:hasRelatedPIDs"?: {
    /**
     * The type of the object, in this case a ods:RelatedPID
     */
    "@type": "ods:RelatedPID";
    /**
     * The PID of the related object, used in cases of `ods:Annotation`, `ods:DigitalMedia` and `ods:DigitalSpecimen`
     */
    "dcterms:identifier"?: string;
    /**
     * The PID of the related object, used in cases of `ods:DataMapping`, `ods:SourceSystem` and `ods:MachineAnnotationService`
     */
    "schema:identifier"?: string;
    /**
     * The type of relationship between the tombstoned object and the related object
     */
    "ods:relationshipType": string;
  }[];
}
export interface Agent3 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o ods:CreateUpdateTombstoneEvent
   */
  "@type":
    | "schema:Person"
    | "schema:Organization"
    | "schema:SoftwareApplication"
    | "prov:Person"
    | "prov:SoftwareAgent";
  /**
   * The primary unique identifier of the Agent object. All identifiers will also be added to the ods:hasIdentifiers array
   */
  "schema:identifier"?: string;
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Contains all roles associated with the agent in the context of the Digital Object. Should always contain at least one role
   *
   * @minItems 1
   */
  "ods:hasRoles"?: [
    {
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    },
    ...{
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    }[]
  ];
  /**
   * Email of the agent
   */
  "schema:email"?: string;
  /**
   * URL to a website of the agent
   */
  "schema:url"?: string;
  /**
   * Contains all identifiers associated with the agent
   */
  "ods:hasIdentifiers"?: Identifier[];
}
