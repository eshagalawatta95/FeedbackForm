using System.ComponentModel.DataAnnotations;

public class Feedback
{
    [Key]
    public int Id { get; set; }
    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }
    [Required]
    public string FeedbackText { get; set; }
    [Required]
    public bool Share { get; set; }
    [Required]
    public string Nickname { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}

