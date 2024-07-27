using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class FeedbackController : ControllerBase
{
    private readonly FeedbackContext _context;

    public FeedbackController(FeedbackContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> PostFeedback([FromBody] Feedback feedback)
    {
        if (ModelState.IsValid)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Feedback submitted successfully!" });
        }

        var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
        return BadRequest(new { message = "Validation failed", errors });
    }
}
