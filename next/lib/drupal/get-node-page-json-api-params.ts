import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { env } from "@/env";

export type ResourceType =
  | "node--frontpage"
  | "node--page"
  | "node--article"
  | "node--case"
  | "node--event"
  | "node--careers";

export function getNodePageJsonApiParams(resourceType: ResourceType) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    env.DRUPAL_SITE_ID,
  );
  // The page content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_hero_image",
        "field_hero_image.field_media_image",
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      .addFields("node--page", [
        "field_hero_image",
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  // The frontpage content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--frontpage") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      // Only published frontpages:
      .addFilter("status", "1")
      .addFields("node--frontpage", [
        "title",
        "field_content_elements",
        "metatag",
      ]);
  }

  // The article content type has an image field, and author information:
  if (resourceType === "node--article") {
    apiParams.addInclude([
      "field_image",
      "uid",
      "field_tags",
      "uid.field_user_image",
      "field_content_elements",
      "field_content_elements.field_image.field_media_image",
      "field_content_elements.field_video",
      "field_content_elements.field_file_attachments.field_media_document",
      "field_content_elements.field_accordion_items",
      "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
      "field_content_elements.field_accordion_items.field_content_elements.field_video",
    ]);
    apiParams.addFields(resourceType, [
      "title",
      "uid",
      "created",
      "field_image",
      "field_content_elements",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
      "field_tags",
      "field_user_image",
    ]);
  }

  if (resourceType === "node--case") {
    apiParams
      .addInclude([
        "field_image",
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_industry",
        "field_solution",
        "field_technology",
        "field_logo",
      ])
      .addFields("node--case", [
        "title",
        "field_excerpt",
        "field_image",
        "field_content_elements",
        "path",
        "status",
        "metatag",
        "field_industry",
        "field_solution",
        "field_technology",
        "field_logo",
      ]);
  }

  if (resourceType === "node--event") {
    apiParams
      .addInclude([
        "field_image",
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_event_speakers",
        "field_event_speakers.field_image.field_media_image",
        "field_event_tags",
      ])
      .addFields("node--event", [
        "title",
        "field_excerpt",
        "field_image",
        "field_content_elements",
        "path",
        "status",
        "metatag",
        "field_start_time",
        "field_end_time",
        "field_event_speakers",
        "field_location",
        "field_event_tags",
        "field_enable_event_registration",
      ]);
  }

  if (resourceType === "node--careers") {
    apiParams
      .addInclude([
        "field_image",
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_country",
      ])
      .addFields("node--careers", [
        "field_image",
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
        "field_country",
      ]);
  }

  return apiParams;
}
