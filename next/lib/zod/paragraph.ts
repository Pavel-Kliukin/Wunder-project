import { z } from "zod";

export const FormattedTextSchema = z.object({
  type: z.literal("paragraph--formatted_text"),
  id: z.string(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_heading: z.string().nullable(),
  field_text_layout: z.enum(["normal", "column"]).nullable(),
});

export const ListingArticlesSchema = z.object({
  type: z.literal("paragraph--listing_articles"),
  id: z.string(),
  field_heading: z.string().nullable(),
  field_limit: z.number(),
});

export const ImageShape = z.object({
  type: z.literal("file--file"),
  id: z.string(),
  filename: z.string(),
  uri: z
    .object({
      url: z.string(),
    })
    .nullable(),
  resourceIdObjMeta: z.object({
    alt: z.string().nullable(),
    title: z.string().nullable(),
    width: z.number(),
    height: z.number(),
  }),
});

export const DocumentShape = z.object({
  type: z.literal("file--file"),
  id: z.string(),
  filename: z.string(),
  filemime: z.string(),
  filesize: z.number(),
  uri: z
    .object({
      url: z.string(),
    })
    .nullable(),
});

export const LinkShape = z.object({
  title: z.string(),
  full_url: z.string(),
});

export const ImageSchema = z.object({
  type: z.literal("paragraph--image"),
  id: z.string(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const FileAttachmentsSchema = z.object({
  type: z.literal("paragraph--file_attachments"),
  id: z.string(),
  field_formatted_text: z
    .object({
      processed: z.string(),
    })
    .nullable(),
  field_heading: z.string().nullable(),
  field_file_attachments: z.array(
    z.object({
      type: z.literal("media--document"),
      id: z.string(),
      field_media_document: DocumentShape,
    }),
  ),
});

export const VideoSchema = z.object({
  type: z.literal("paragraph--video"),
  id: z.string(),
  field_video: z
    .object({
      type: z.literal("media--remote_video"),
      id: z.string(),
      name: z.string(),
      field_media_oembed_video: z.string(),
    })
    .nullable(),
});

export const LinksSchema = z.object({
  type: z.literal("paragraph--links"),
  id: z.string(),
  field_links: z.array(LinkShape),
});

const AccordionItemSchema = z.object({
  type: z.literal("paragraph--accordion_item"),
  id: z.string(),
  field_heading: z.string(),
  field_content_elements: z.array(
    z.discriminatedUnion("type", [
      FormattedTextSchema,
      ImageSchema,
      VideoSchema,
      LinksSchema,
      FileAttachmentsSchema,
    ]),
  ),
});

export const AccordionSchema = z.object({
  type: z.literal("paragraph--accordion"),
  id: z.string(),
  field_heading: z.string().nullable(),
  field_accordion_layout: z.enum(["one_column", "two_columns"]),
  field_accordion_items: z.array(AccordionItemSchema),
  field_primary_link: LinkShape.nullable().optional(),
  field_formatted_text: z
    .object({
      processed: z.string(),
    })
    .nullable(),
});

export const HeroSchema = z.object({
  type: z.literal("paragraph--hero"),
  id: z.string(),
  field_heading: z.string(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_primary_link: LinkShape.nullable().optional(),
  field_secondary_link: LinkShape.nullable().optional(),
});

export const QuoteSchema = z.object({
  type: z.literal("paragraph--quote"),
  id: z.string(),
  field_quote: z.object({
    processed: z.string(),
  }),
  field_author: z.string().nullable(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const TextQuoteSchema = z.object({
  type: z.literal("paragraph--text_quote"),
  id: z.string(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_quote: z.object({
    processed: z.string(),
  }),
  field_text_quote_layout: z.enum(["left", "right"]),
});

export const TextImageSchema = z.object({
  type: z.literal("paragraph--text_image"),
  id: z.string(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_text_image_layout: z.enum(["left", "right"]),
});

export const PageHeroSchema = z.object({
  type: z.literal("paragraph--page_hero"),
  id: z.string(),
  field_formatted_text: z
    .object({
      processed: z.string(),
    })
    .nullable(),
  field_heading: z.string(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const SpeakerSchema = z.object({
  type: z.literal("paragraph--speaker"),
  id: z.string(),
  field_speaker: z.string(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const ListingCareersSchema = z.object({
  type: z.literal("paragraph--listing_careers"),
  id: z.string(),
  field_heading: z.string().nullable(),
});

export type FormattedText = z.infer<typeof FormattedTextSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Links = z.infer<typeof LinksSchema>;
export type Accordion = z.infer<typeof AccordionSchema>;
export type AccordionItem = z.infer<typeof AccordionItemSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type ListingArticles = z.infer<typeof ListingArticlesSchema>;
export type FileAttachments = z.infer<typeof FileAttachmentsSchema>;
export type Quote = z.infer<typeof QuoteSchema>;
export type TextQuote = z.infer<typeof TextQuoteSchema>;
export type TextImage = z.infer<typeof TextImageSchema>;
export type PageHero = z.infer<typeof PageHeroSchema>;
export type Speaker = z.infer<typeof SpeakerSchema>;
export type ListingCareers = z.infer<typeof ListingCareersSchema>;

export type Paragraph =
  | FormattedText
  | Image
  | Video
  | Links
  | Accordion
  | AccordionItem
  | Hero
  | ListingArticles
  | FileAttachments
  | Quote
  | TextQuote
  | TextImage
  | PageHero
  | Speaker
  | ListingCareers;
