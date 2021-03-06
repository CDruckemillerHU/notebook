class Document < ApplicationRecord
  acts_as_paranoid

  belongs_to :user,     optional: true
  belongs_to :universe, optional: true

  has_many :document_analysis,   dependent: :destroy
  has_many :document_entities,   through: :document_analysis
  has_many :document_concepts,   through: :document_analysis
  has_many :document_categories, through: :document_analysis

  has_many :document_revisions, dependent: :destroy
  after_update :save_document_revision!

  include HasParseableText
  include HasPartsOfSpeech
  include HasImageUploads

  include Authority::Abilities
  self.authorizer_name = 'DocumentAuthorizer'

  attr_accessor :tagged_text

  def self.color
    'teal'
  end

  def self.hex_color
    '#009688'
  end

  def self.icon
    'description'
  end

  def name
    title
  end

  def description
    self.body
  end

  def universe_field_value
    # TODO: populate value from cache when documents belong to a universe
  end

  def analyze!
    # Create an analysis placeholder to show the user one is queued,
    # then process it async.
    analysis = self.document_analysis.create(queued_at: DateTime.current)
    DocumentAnalysisJob.perform_later(analysis.reload.id)

    # TODO: Should we also be deleting all existing analyses here since they're
    #       now out of date? Or should we wait until the analysis is complete?
  end

  def save_document_revision!
    SaveDocumentRevisionJob.perform_later(self.id)
  end

  def reading_estimate
    words = (self.body || "").split(/\s+/).count
    minutes = 1 + (words / 200).to_i

    "~#{minutes} minute read"
  end

  def tagged_text
    @tagged_text ||= begin
      tagger = EngTagger.new
      tagger.add_tags(plaintext)
    end
  end
end
