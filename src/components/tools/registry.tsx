import type { ComponentType } from "react";
import TextCounterTool from "@/components/tools/text-counter";
import Base64Tool from "@/components/tools/base64-encode-decode";
import JsonFormatterTool from "@/components/tools/json-formatter";
import UrlEncodeDecodeTool from "@/components/tools/url-encode-decode";
import UnixTimestampTool from "@/components/tools/unix-timestamp";
import ImageCompressorTool from "@/components/tools/image-compressor";
import PasswordGeneratorTool from "@/components/tools/password-generator";
import UuidGeneratorTool from "@/components/tools/uuid-generator";
import JwtDecoderTool from "@/components/tools/jwt-decoder";
import HashGeneratorTool from "@/components/tools/hash-generator";
import QrCodeTool from "@/components/tools/qr-code";
import MarkdownPreviewTool from "@/components/tools/markdown-preview";
import ColorTools from "@/components/tools/color-tools";
import CssFormatterTool from "@/components/tools/css-formatter";
import HtmlEntitiesTool from "@/components/tools/html-entities";
import RegexTesterTool from "@/components/tools/regex-tester";
import LoremIpsumTool from "@/components/tools/lorem-ipsum";
import TimezoneConverterTool from "@/components/tools/timezone-converter";
import Base64ImageTool from "@/components/tools/base64-image";
import JsonCsvTool from "@/components/tools/json-csv";
import CaseConverterTool from "@/components/tools/case-converter";
import PasswordStrengthTool from "@/components/tools/password-strength";
import UnitConverterTool from "@/components/tools/unit-converter";
import AgeDateDifferenceTool from "@/components/tools/age-date-difference";
import DateDiffDaysTool from "@/components/tools/date-diff-days";
import BmiCalculatorTool from "@/components/tools/bmi-calculator";
import DiceCoinTool from "@/components/tools/dice-coin";
import EmailUrlValidatorTool from "@/components/tools/email-url-validator";
import TikTokProfileTool from "@/components/tools/tiktok-profile";
import WebsiteStatusTool from "@/components/tools/website-status";
import IpAsnLookupTool from "@/components/tools/ip-asn-lookup";
import DnsLookupTool from "@/components/tools/dns-lookup";
import WhoisLookupTool from "@/components/tools/whois-lookup";
import OpenGraphPreviewTool from "@/components/tools/opengraph-preview";
import SslCheckerTool from "@/components/tools/ssl-checker";
import PingLatencyTool from "@/components/tools/ping-latency";

export const toolComponents: Record<string, ComponentType> = {
  "text-counter": TextCounterTool,
  "base64-encode-decode": Base64Tool,
  "json-formatter": JsonFormatterTool,
  "url-encode-decode": UrlEncodeDecodeTool,
  "unix-timestamp": UnixTimestampTool,
  "image-compressor": ImageCompressorTool,
  "password-generator": PasswordGeneratorTool,
  "uuid-generator": UuidGeneratorTool,
  "jwt-decoder": JwtDecoderTool,
  "hash-generator": HashGeneratorTool,
  "qr-code": QrCodeTool,
  "markdown-preview": MarkdownPreviewTool,
  "color-tools": ColorTools,
  "css-formatter": CssFormatterTool,
  "html-entities": HtmlEntitiesTool,
  "regex-tester": RegexTesterTool,
  "lorem-ipsum": LoremIpsumTool,
  "timezone-converter": TimezoneConverterTool,
  "base64-image": Base64ImageTool,
  "json-csv": JsonCsvTool,
  "case-converter": CaseConverterTool,
  "password-strength": PasswordStrengthTool,
  "unit-converter": UnitConverterTool,
  "age-date-difference": AgeDateDifferenceTool,
  "date-diff-days": DateDiffDaysTool,
  "bmi-calculator": BmiCalculatorTool,
  "dice-coin": DiceCoinTool,
  "email-url-validator": EmailUrlValidatorTool,
  "tiktok-profile": TikTokProfileTool,
  "website-status": WebsiteStatusTool,
  "ip-asn-lookup": IpAsnLookupTool,
  "dns-lookup": DnsLookupTool,
  "whois-lookup": WhoisLookupTool,
  "opengraph-preview": OpenGraphPreviewTool,
  "ssl-checker": SslCheckerTool,
  "ping-latency": PingLatencyTool,
};
